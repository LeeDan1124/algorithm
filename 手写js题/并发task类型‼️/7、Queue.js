/**
 * 实现一个Queue，task方法可以添加任务，在一段延迟后执行下一个任务，start方法开始这个任务队列
 */

new Queue()
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
