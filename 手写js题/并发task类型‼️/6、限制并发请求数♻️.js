// ✅
class Scheduler {
  constructor(maxLimit, taskList, callback) {
    this.maxLimit = maxLimit;
    this.taskList = taskList.map((task) => () => task);
    this.callback = callback;

    this.runNums = 0;
    this.resList = [];

    this.runTask();
  }

  async runTask() {
    if (!this.taskList.length) {
      this.callback(this.resList);
    }
    while (this.runNums < this.maxLimit && this.taskList.length) {
      const curTask = this.taskList.shift();
      this.runNums++;
      const res = await curTask();
      this.resList.push(res);
      this.runNums--;
      await this.runTask();
    }
  }
}

let p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

let p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

let p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3);
  }, 2000);
});

let p4 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4);
  }, 1000);
});

// 依次执行，执行结束后在callback中返回
// 其实就是实现Promise.all的功能
new Scheduler(2, [p1, p2, p3, p4], (res) => {
  console.log(res); // [1, 2, 3, 4]
});

// 参考
class RequestLimit {
  constructor(limit = 3, requsets, cb) {
    this.limit = limit;
    this.requsets = requsets;
    this.callback = cb;
    this.reqLen = requsets.length;

    this.result = [];
    this.reqIndex = -1; // 记录最后加入请求的索引
    this.resCount = 0; // 记录已经请求结束的数量

    for (let i = 0; i < limit; i++) {
      this.startRequest(i);
    }
  }

  startRequest(index) {
    if (!this.requsets[index]) return;

    this.reqIndex++;
    this.requsets[index].then((res) => {
      this.result[index] = res;
      this.resCount++;
      if (this.resCount === this.reqLen) {
        return this.callback(this.result);
      }
      let nextIndex = this.reqIndex + 1;
      this.startRequest(nextIndex);
    });
  }
}
