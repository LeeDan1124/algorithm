// ✅
class Arrange {
  constructor(name) {
    this.tasks = [];
    const initTask = () => {
      return new Promise((resolve) => {
        console.log(`${name} is notify`);
        resolve();
      });
    };
    this.tasks.push(initTask);
  }

  wait(delay) {
    const waittask = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay * 1000);
      });
    };
    this.tasks.push(waittask);
    return this;
  }

  Do(action) {
    const doTask = () => {
      return new Promise((resolve) => {
        console.log(`start to ${action}`);
        resolve();
      });
    };
    this.tasks.push(doTask);
    return this;
  }

  waitFirst(delay) {
    const waitFirstTask = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay * 1000);
      });
    };
    this.tasks.unshift(waitFirstTask);
    return this;
  }

  async execute() {
    while (!!this.tasks.length) {
      const curTask = this.tasks.shift();
      await curTask();
    }
  }
}

function arrange(name) {
  return new Arrange(name);
}

arrange("William").wait(5).Do("commit").waitFirst(3).execute();

/**
 * 只有调用execute时才执行
 * 等待3秒
 * 输出William is notify
 * 再等待5秒
 * 输出start to commit
 */

// 做完这道题 做第13题 链式调用
