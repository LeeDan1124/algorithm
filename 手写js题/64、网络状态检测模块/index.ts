import { Detector } from './Detector';
import { Status } from './status';

const de = new Detector();

export function on(event: string | symbol, listener: (...args: any[]) => void): void {
    de.on(event, listener);
}

export function getStatus(): Promise<Status> {
    return de.getStatus();
}

/**
 * Set a interval value
 * @param n {number} default is 1000ms
 */
export function setInterval(n: number): void {
    de.setDistance(n);
}

export function setRequestTimeout(n: number): void {
    de.setTimeout(n);
}
