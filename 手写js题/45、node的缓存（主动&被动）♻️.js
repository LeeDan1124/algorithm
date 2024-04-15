// ✅
// DataCache.js
// 将请求数据存储在node的内存中，以达到再次请求接口时直接从缓存中返回数据
/**
 * Function fetch 需要缓存的数据生成器,返回需要被缓存的数据.
 * number mode 缓存模式(主动/被动, 默认为被动), 主动模式下 会设定计时器, 每隔一段时间主动调用 fetch 获取数据, 获取成功后更新缓存. 被动模式下 仅在读取数据时 判断是否过期, 如果过期, 则调用 fetch 去更新数据(但本次读取的数据依然是旧的).
 * number interval 缓存更新时间间隔/有效期
 */

const ACTIVE_MODE = 1; // 主动模式
const PASSIVE_MODE = 0; // 被动模式

const DEFAULT_CACHETIME = 10 * 60 * 1000; // 默认的更新时间，10分钟

class DataCache {
  constructor(fetch, mode = PASSIVE_MODE, interval = DEFAULT_CACHETIME) {
    this.fetch = fetch;
    this.mode = mode;
    this.interval = interval;
    this.cache = null;
    this.tempData = null;
    this.refreshIntervalId = null; // 主动模式下的定时器id
  }

  flush() {
    return this.fetch().then((res) => {
      this.cache = res;
      return res;
    });
  }

  // 初始化数据
  async init() {
    if (this.tempData === null) {
      this.tempData = await this.flush().catch(() => {});

      if (this.tempData && this.mode === ACTIVE_MODE) {
        // 主动模式
        this.refreshIntervalId = setInterval(() => {
          this.flush().catch(() => {});
        }, this.interval);
      } else {
        // 被动模式 到缓存时间后清除过期数据
        setTimeout(() => {
          this.cache = null;
        }, this.interval);
      }
    }
  }

  // 获取数据
  async getData() {
    return this.cache ? this.cache : await this.flush().catch(() => {});
  }

  // 清理资源
  destory() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
    this.cache = null;
    this.tempData = null;
  }
}

// 使用 subWay.js
const fetchData = () => {}; /* 实现获取数据的逻辑 */
const dataCache = new DataCache(fetchData, 10, ACTIVE_MODE);

// 🍊 这里要放在global上，不然，运行完getSubway后，DataCache会被清除掉
global.$subwayDC = notEmptyObj(global.$subwayDC) ? global.$subwayDC : dataCache;
const dc = global.$subwayDC;

module.exports = {
  // 在使用时，需要先执行一次init函数
  async getSubway({ locale = "zh-CN" }) {
    await dc.init();

    const location = dc.get("LOCATION");

    return location[locale];
  },
};
