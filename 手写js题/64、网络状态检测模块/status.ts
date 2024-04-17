import { request } from "./request";

const CFG = {
  intranet: "https://proton.basebiz.ctripcorp.com/telemetry",
  extranet: "https://proton.c-ctrip.com/telemetry",
};

export interface Status {
  location: "intranet" | "extranet" | "unavailable";
  ping(n: number): Promise<Status>;
}

export const unavailable: Status = {
  location: "unavailable",
  ping(n: number): Promise<Status> {
    return Promise.resolve(this);
  },
};

export const extranet: Status = {
  location: "extranet",
  ping(n: number): Promise<Status> {
    return request(CFG.extranet, { timeout: n })
      .then(() => {
        return this;
      })
      .catch(() => {
        return unavailable.ping(n);
      });
  },
};

/**
 * The company intranet status
 */
export const intranet: Status = {
  location: "intranet",
  ping(n: number): Promise<Status> {
    return request(CFG.intranet, { timeout: n, retry: 3, retryInterval: 500 })
      .then(() => {
        return this;
      })
      .catch(() => {
        return extranet.ping(n);
      });
  },
};
