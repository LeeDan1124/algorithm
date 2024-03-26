// let res = []
// setInterval(() => {
//   res.push(1)
//   console.log(res)    // res中也是每隔10秒push一个1，即每隔10s才会往执行栈中推一个任务
//   let start = new Date().getTime();
//   while (new Date().getTime() - start < 10000) {
//     continue;
//   }
//   console.log(1)  //如果setInterval中是同步代码，每隔10s输出一个1，因为setInterval是每隔delay时间就往执行栈中推一个任务，但是如果执行栈中还有上次的任务没有完成，它是不会继续往里推的
// }, 1000)

// let res1 = []
// setInterval(() => {
//   res1.push(1)
//   console.log(res1)   // 每隔1秒就会往执行栈中推一个任务，即如果setInterval中是异步代码，那么是每隔delay时间往执行栈中推一次事件，但是事件的回调是等事件执行结束后才第一次调用，接下来每次都隔1s输出回调
//   setTimeout(() => {
//     console.log(1) // 如果setInterval中是异步代码，第一次是隔10s输出一次1，接下来每一次都是每隔1s输出一次
//   }, 10000)
// }, 1000)
function sleep (delay) {
  const start = Date.now()
  while(Date.now() - start < delay){}
}

let start = Date.now()
setInterval(() => {
  console.log('任务间隔：', Date.now() - start)
  sleep(3000)
  console.log('任务间隔222：', Date.now() - start)
  start = Date.now()
}, 1000)


// let start = Date.now()
// function fn() {
//   setTimeout(() => {
//     console.log('任务间隔：', Date.now() - start)
//     sleep(1200)
//     start = Date.now()
//     fn()
//   }, 1000)
// }
// fn()


// let startTime = new Date().getTime();
// let count = 0;
// //耗时任务
// setInterval(function () {
//   let i = 0;
//   while (i++ < 1000000000);
// }, 0);
// setInterval(function () {
//   count++;
//   console.log(
//     `与原设定的间隔时差了${
//       new Date().getTime() - (startTime + count * 1000)
//     }
//     毫秒`
//   );
// }, 1000);

