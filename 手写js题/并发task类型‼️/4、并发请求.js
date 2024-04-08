// ✅
// 只能有2个请求在执行，其余的请求需要等前两两个请求空出来才能发请求
// 想象一下，有一天你突然一次性发了10个请求，但是这样的话并发量是很大的，能不能控制一下，
// 就是一次只发2个请求，某一个请求完了，就让第3个补上，又请求完了，让第4个补上，以此类推，让最高并发量变成可控的
/**
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
输出顺序是：2 3 1 4

整个的完整执行流程：

一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4
*/

/**
 * 参考银行办理业务（2个窗口可以办理业务）
 * 1、人到银行后先叫号排队【将任务添加到任务队列中】
 * 2、初始开始时柜台要叫号，但是需要保证有排队的人【开始执行任务】
 * 3、当柜台有其中一个空出来后，再从排队的人里叫一个过来执行【执行完从任务队列里取没执行的】
 */

class Scheduler {
  constructor(maxLimit) {
    this.maxLimit = maxLimit;
    this.taskLisk = [];
    this.curNums = 0;
  }

  add(delay, order) {
    const task = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, delay);
      });
    };
    this.taskLisk.push(task);
  }

  taskStart() {
    while (this.curNums < this.maxLimit && this.taskLisk.length) {
      const curTask = this.taskLisk.shift();
      this.curNums++;
      curTask().finally(() => {
        this.curNums--;
        this.taskStart();
      });
    }
  }
}

// 测试
// const task = (time, order) => {
//   setTimeout(() => {
//     console.log(order + "执行完了");
//   }, time);
// };

const scheduler = new Scheduler(2); // 只能并发两个请求
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
// 做完做第5题，注意与第5题的区别，这个add的是什么，什么时候开始执行
