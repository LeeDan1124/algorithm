// 任务队列的执行与中断封装
/**
 * 1、任务依次执行
 * 2、任务不可中断，但是任务和任务之间可中断
 * 3、中断后重启需要接着执行，而不是从头开始
 * 4、返回start、和 stop函数，用来启动/暂停任务执行
 * 5、所有任务执行结束后可以得到每个任务的执行结果
 */
function taskQueueRunAStop(tasks) {
  let isStop = true; // 是否暂停了[刚开始本来就是暂停的]
  let runningIndex = 0; // 当前正在执行的任务index
  const result = []; // 任务完成后的数据

  // 开启任务执行
  const start = () => {
    // 为什么返回promise是由于
    return new Promise(async (resolve, reject) => {
      // 当前任务开始运行后，不要有别的操作打扰（比如又开始一遍）
      if (!isStop) return;
      isStop = false;
      // 依次执行任务
      while (runningIndex < tasks.length) {
        // console.log(runningIndex + '开始执行')
        const curTask = tasks[runningIndex];
        const curResult = await curTask();
        console.log(curResult, "-----curResult");
        result[runningIndex] = curResult;
        // console.log(runningIndex + '执行结束')
        runningIndex++;

        // 执行完当前任务后判断一下是否执行过暂停操作，如果暂停了的话，中断此次执行，但是目前start仍然是挂起状态，因为还没有执行resolve
        if (isStop) {
          return console.log("暂停了");
        }
      }

      // 所有任务均已完成
      isStop = true;
      resolve(result);
    });
  };

  // 暂停任务执行
  const stop = () => {
    isStop = true;
  };

  return {
    start,
    stop,
  };
}
