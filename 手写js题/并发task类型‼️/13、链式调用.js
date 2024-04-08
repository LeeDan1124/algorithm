// ✅
class LazyManO {
  constructor(manName) {
    this.tasks = [];

    const initTask = () => {
      return new Promise((resolve) => {
        console.log(`Hi! This is ${manName}`);
        resolve();
      });
    };
    this.tasks.push(initTask);

    setTimeout(() => {
      this.runTask();
    });
  }

  _sleepTask(delay) {
    const sleepTask = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${delay}`);
          resolve();
        }, delay * 1000);
      });
    };
    return sleepTask;
  }

  sleep(delay) {
    this.tasks.push(this._sleepTask(delay));
    return this;
  }

  sleepFirst(delay) {
    this.tasks.unshift(this._sleepTask(delay));
    return this;
  }

  eat(food) {
    const eatTask = () => {
      return new Promise((resolve) => {
        console.log(`Eat ${food}~`);
        resolve();
      });
    };
    this.tasks.push(eatTask);
    return this;
  }

  async runTask() {
    if (!this.tasks.length) return;
    const curTask = this.tasks.shift();
    await curTask();
    this.runTask();
  }
}

function LazyMan(manName) {
  return new LazyManO(manName);
}

LazyMan("Hank"); // Hi! This is Hank

LazyMan("Hank").sleep(3).eat("dinner");
// Hi! This is Hank
// 等待10s
// Wake up after 10
// Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper");
// Hi! This is Hank
// Eat dinner~
// Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper");
// 等待5s
// Wake up after 5
// Hi! This is Hank
// Eat supper~
