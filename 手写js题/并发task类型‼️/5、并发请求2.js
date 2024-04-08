
/**
 * @param {*Array} urls 接口请求的url
 * @param {*number} maxLimit 最大的并发数
 */
function bingFa(urls, maxLimit) {
  let runningIndex = 0
  let index = 0

  function inner() {
    while(runningIndex <= maxLimit && !!urls.length) {
      runningIndex++
      index++
      const curTaskUrl = urls.shift()

      new Promise((resolve) => {
        setTimeout(() => {
          resolve(curTaskUrl)
        }, index * 1000)
      }).then(res => {
        console.log(res + '执行结束')
        runningIndex--
        inner()
      })
    }
  } 
  inner()
}

// bingFa([
//   'url/1', //1s
//   'url/2', //2s 
//   'url/3', //3s
//   'url/4', //
//   'url/5',
//   'url/6',
//   'url/7',
//   'url/8',
// ], 3)


class Scheduler{
  constructor() {
    this.queue = []
    this.runningNum = 0
    this.maxLimit = 2
  }

  // add传入一个task，返回一个promise，要思考返回的这个promise是什么时间解决的
  // 当传入的task执行完有结果后add返回的promise解决
  add(promiseTask) {
    return new Promise((resolve, reject) => {
      const runOneTask = () => {
        return promiseTask()
          .then(resolve, reject)
          .finally(() => {
            this.runningNum--
            this.runTask()
          })
      }

      // 当传入的task还没有达到并发数量时，就直接执行，如果达到并发数了，就推到队列里去
      if (this.runningNum < this.maxLimit) {
        this.runningNum++
        runOneTask()
      } else {
        // 这里为什么不是直接推promiseTask，而是推runOneTask，是为了保存当前任务完成后要用到的resolve, reject
        this.queue.push(runOneTask)
      }
    })
  }

  runTask() {
    if (this.runningNum < this.maxLimit && this.queue.length > 0) {
      this.runningNum++
      const curTask = this.queue.shift()
      curTask()
        .then(() => {
          this.runningNum--
          this.runTask()
        })
    }
  }
}




class Scheduler1{
  constructor() {
    this.queue = []
    this.runningNum = 0
    this.maxLimit = 2
  }

  add(promiseTask) {
    return new Promise((resolve, reject) => {
      const runOneTask = () => {
        return promiseTask()
          .then(resolve, reject)
          // .finally(() => {
          //   this.runningNum--
          //   this.runTask()
          // })
      }
      // if (this.runningNum < this.maxLimit) {
      //   this.runningNum++
      //   runOneTask()
      // } else {
        this.queue.push(runOneTask)
        this.runTask()
      // }
    })
  }

  runTask() {
    if (this.runningNum < this.maxLimit && this.queue.length > 0) {
      this.runningNum++
      const curTask = this.queue.shift()
      curTask()
        .then(() => {
          this.runningNum--
          this.runTask()
        })
    }
  }
}


// 测试
const timeout = (time, order) => {
  return new Promise((resolve, reject) => {
      setTimeout(resolve, time)
  })
} 
const scheduler = new Scheduler1();
const addTask = (time, order) => {
scheduler
  .add(() => timeout(time, order))
  .then(() => {console.log(order)})
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// 并发两个，500ms后输出2 800ms后输出3 1000ms后输出1 1200ms后输出4