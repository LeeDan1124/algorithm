// ✅ 🔁
class TaskPro {
  constructor() {
    this.tasks = [];
    this.runningIndex = 0;
    this.next = () => {
      return new Promise((resolve) => {
        this.runningIndex++;
        this.run();
        resolve();
      });
    };
  }

  addTask(func) {
    if (typeof func !== "function") {
      throw new Error("需传入一个函数");
    }
    this.tasks.push(func);
    return this;
  }

  async run() {
    if (!this.tasks.length) return;

    const startIndex = this.runningIndex;

    const curTask = this.tasks.shift();
    try {
      await curTask(this.next);
    } catch (e) {}
    const endIndex = this.runningIndex;

    if (startIndex === endIndex) {
      await this.next();
    }
    // this.run();
  }
}

// 执行next()后，执行下一个任务，最后再回来执行next后面的代码
const task = new TaskPro();
task.addTask(async (next) => {
  console.log("1 start");
  await next();
  console.log("1 end");
});
task.addTask(() => {
  console.log(2);
});
task.addTask(() => {
  console.log(3);
});
task.run(); // 输出 1 start、2、3、1 end

// 参考答案
class TaskPro1 {
  constructor() {
    this.taskList = [];
    this.isRunning = false;
    this.runningIndex = 0;
    this.next = async () => {
      this.runningIndex++;
      await this.runTask();
    };
  }

  addTask(cb) {
    this.taskList.push(cb);
    return this;
  }

  run() {
    if (this.isRunning || !this.taskList.length) return;

    this.runTask();
  }

  /**
   * 取出一个任务执行
   */
  async runTask() {
    if (this.runningIndex >= this.taskList.length) {
      this.reset();
      return;
    }

    this.isRunning = true;
    const startIndex = this.runningIndex;

    const curTask = this.taskList[this.runningIndex];
    await curTask(this.next);

    const endIndex = this.runningIndex;

    // 如果回调里执行了next,那么执行结束后的runningIndex和执行之前的runningIndex是不一样的；如果是一样的，说明没有执行next
    if (startIndex === endIndex) {
      this.next();
    }
  }

  reset() {
    this.isRunning = false;
    this.taskList = [];
    this.runningIndex = 0;
  }
}
