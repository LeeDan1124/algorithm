// 修改a.js中的代码，实现b.js在请求回来数据后在发起下一个请求
// a.js
function myFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 2000);
  });
}

const taskList = [];
let isRunning = false;
function limitRequest(url) {
  // 1、在b.js中调用的时候，后面跟了then，说明，这个函数返回的是一个promise，不要考虑别的，直接返回
  return new Promise((resolve, reject) => {
    // 2、在调用的时候，并不是一调用就能有结果，而是只能并发1个，那进来的请求怎么办？
    // （1）先存起来，存什么？---url、以及这个请求成功/失败时要触发的resolve和reject函数！！
    taskList.push({
      url,
      resolve,
      reject,
    });
    // 3、对于第一个进来的请求，要立即响应
    // 这里加一个isRunning判断，是因为在下面的runTask中shift出来任务后，taskList又变成了空，下一个执行到这里之后，还能紧接着触发runTask函数
    if (taskList.length === 1 && !isRunning) {
      runTask();
    }
  });
}

function runTask() {
  if (!taskList.length || isRunning) return;
  const { url, resolve, reject } = taskList.shift();
  isRunning = true;
  myFetch(url)
    .then((r) => {
      resolve(r);
    })
    .catch((e) => {
      reject(e);
    })
    .finally(() => {
      // 4、上一个有响应后，再进行下一个的请求
      isRunning = false;
      runTask();
    });
}

// b.js
limitRequest("/1").then((res) => {
  console.log(res, "----res1");
});
limitRequest("/2").then((res) => {
  console.log(res, "----res2");
});
limitRequest("/3").then((res) => {
  console.log(res, "----res3");
});
