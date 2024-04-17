import * as http from 'http';
import * as https from 'https';
import * as URL from 'url';

export interface RequestRetry {
  timeout: number,
  retry: number,
  retryInterval: number
}

export function request(url: string, param: Partial<RequestRetry> = {}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const urlObj: https.RequestOptions = URL.parse(url, true);

    let _request = http.request;
    switch (urlObj.protocol) {
      case 'http:':
        _request = http.request;
        break;
      case 'https:':
        _request = https.request;
        break;
      default:
        reject(new Error('Unsupported Protocol'));
        return;
    }

    const opts: RequestRetry = Object.assign({ timeout: 3000, retry: 0, retryInterval: 500 }, param);
    urlObj.timeout = opts.timeout;
    urlObj.rejectUnauthorized = false;

    const req = _request(urlObj, (res) => {
      const { statusCode } = res;
      res.resume();
      if (statusCode && statusCode >= 200 && statusCode < 400) {
        return resolve(true);
      } else {
        return reject(new Error(statusCode + ':' + res.statusMessage));
      }
    });

    req.on('error', (e: any) => {
      if (e.code == 'ECONNREFUSED' || e.code == 'ECONNRESET') {
        opts.retry = opts.retry || 0;
        if (opts.retry > 0) {
          opts.retry -= 1;
          // console.log('Found ' + e.code + ', Retry ' + opts.retry);
          setTimeout(() => {
            request(url, opts).then(resolve, reject);
          }, opts.retryInterval || 500);
        } else {
          reject(e);
        }
      } else {
        reject(e);
      }
    });
    req.on('timeout', () => {
      req.destroy(new Error('Request Timeout'));
    });

    req.end();
  });
}

