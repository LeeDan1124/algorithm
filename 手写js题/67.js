/**
 * 实现 Promise.any 功能，执行一组promise，其中任意一个 promise resolve 即成功，then 返回该 promise 结果，全部 promise 都 reject 时返回 new Error('All promises were rejected')
 */
// http://conf.ctripcorp.com/pages/viewpage.action?pageId=685024559
function PromiseAny(promiseArray) {
  return new Promise((resolve, reject) => {
    /**
     * 补全代码
     */
  })
}
 
const now = Date.now();
PromiseAny([300, 100, 200, 400].map(time => {
  return new Promise((resolve, reject) => {
    if (time === 100) {
      setTimeout(reject, time);
    } else {
      setTimeout(resolve, time);
    }
    // setTimeout(reject, time);
  })
})).then(() => {
  console.log(`Time is ${Date.now() - now}`);   // Time is 203
}).catch((ex) => {
  console.log(ex.message);  // All promises were rejected
});