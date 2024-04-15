// 这种方式是按照延时顺序执行
class QueueByDelay {
  constructor() {
    this.tasks = []
  }

  task(delay, cb) {
    const _task = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          cb()
          resolve()
        }, delay)
      })
    }
    this.tasks.push(_task)
    return this
  }

  async start() {
    for(let i = 0; i < this.tasks.length; i++) {
      const curTask = this.tasks[i]
      curTask()
    }
  }
}

/**
 * 1s后输出1 3
 * 5s后输出2
 */
new QueueByDelay()
  .task(1000, () => {
    console.log(1);
  })
  .task(4000, () => {
    console.log(2);
  })
  .task(1000, () => {
    console.log(3);
  })
  .start();




// 按照task添加的顺序执行
class QueueByTaskOrder {

  constructor() {
    this.tasks = []
  }

  task(delay, cb) {
    const _task = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          cb()
          resolve()
        }, delay)
      })
    }
    this.tasks.push(_task)
    return this
  }

  async start() {
    for(let i = 0; i < this.tasks.length; i++) {
      const curTask = this.tasks.shift()
      await curTask()
      i--
    }
  }

}

/**
 * 1s后输出1；
 * 5s后输出2
 * 6s后输出3
 */
new QueueByTaskOrder()
  .task(1000, () => {
    console.log(1);
  })
  .task(4000, () => {
    console.log(2);
  })
  .task(1000, () => {
    console.log(3);
  })
  .start();
