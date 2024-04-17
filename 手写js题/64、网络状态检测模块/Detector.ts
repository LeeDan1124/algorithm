import * as os from "os";
import {
    EventEmitter
} from 'events';
import {
    exec
} from 'child_process';

const systemHelper = require('@ctrip/electron-system-helper');

import {
    Status,
    intranet,
    unavailable
} from './status';

interface routerInfo {
    dest: string,
    mask: string,
    gateway: string,
    ifIndex: number,
    ifMetric: number
}

export class Detector extends EventEmitter {
    private _platform: string = os.platform();
    private _routeInformationMac = '';
    private _routeInformationWin: routerInfo[] = [];
    private _isReady = false;
    private _status: Status = unavailable;
    private readyPromise: Promise<Status> = Promise.resolve(this._status);
    private _detectInterval: any;
    private _isWindow: boolean;
    private _isSupport: boolean;

    constructor(
        private interval: number = 2000,
        private timeout: number = 3000
    ) {
        super();

        this._isWindow = this._platform === 'win32';
        this._isSupport = (this._platform == 'darwin' || this._platform == 'win32');

        if (!this._isSupport) {
            return;
        }

        if (this._isWindow) {
            /**如果是windows，设置router的change监听。
             * 主动探测会被安全卫士扫描导致卡顿
             */
            this.setNetworkChangeListener();
        }
        else {
            /**如果是mac，则按interval间隔读取router信息 */
            this._detectInterval = setInterval(this.getRouteInformation, this.interval);
        }

        this.readyPromise = intranet.ping(this.timeout).then(ret => {
            this._isReady = true;
            this._status = ret;
            return this._status;
        });
    }

    private setNetworkChangeListener = (): void => {
        systemHelper.on("networkChange", () => {
            // console.log(`${new Date()} Network Change, Err ${err}, Status: ${status}`);
            this.debounceDetectLocation();
        });
    }


    private getRouteInformation = (): void => {
        const command = 'netstat -nr | awk -s \'{print $1,$2;}\'';
        exec(command, (error, stdout) => {
            if (error) {
                // console.error(`[network-detector] exec command error: ${error}`);
                return;
            }

            if (this._routeInformationMac != stdout && this._routeInformationMac != '') {
                this.detectLocation();
            }
            this._routeInformationMac = stdout;
        });
    }

    private debounceDetectLocation() {
        clearTimeout(this._detectInterval);
        this._detectInterval = setTimeout(() => { this.detectLocation(); }, this.interval);
    }

    private detectLocation(): Promise<Status> {
        return intranet.ping(this.timeout).then(ret => {
            if (ret.location === this._status.location) {
                // console.log('network status stays the same.');
            } else {
                this._status = ret;
                this.emit('change', ret);
            }
            return this._status;
        });
    }

    setDistance(n: number): void {
        if (typeof n !== 'number') {
            throw new TypeError("The value must a number, but you provide a" + typeof n);
        }

        if (this._platform == 'darwin') {
            clearInterval(this._detectInterval);
            this.timeout = n;
            this._detectInterval = setInterval(this.getRouteInformation, this.timeout);
        }
    }

    setTimeout(n: number): void {
        if (typeof n !== 'number') {
            throw new TypeError(`The value must a number, but you provide a '${(typeof n)}'`);
        }
        this.timeout = n;
    }

    getStatus(): Promise<Status> {
        if (!this._isSupport) {
            throw new Error("Unsupport Platform or Process");
        }
        if (this._isReady) {
            return Promise.resolve(this._status);
        }

        return this.readyPromise;
    }
}

