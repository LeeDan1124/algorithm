// 实现函数 async function batchJobs(inputArray, async function doJob) => resultArray,
// 遍历 inputArray，针对每个数组元素 item，执行 async function doJob(item) => result ，分别写出依次按序执行、并发同时执行，
// 全部执行完毕后，将每一项的执行结果 result 以数组形式合并返回 resultArray

// 依次按序执行[并发1个]
async function batchJobsOneByOne(inputArray, doJob) {
  const taskList = inputArray.map((i) => () => doJob(i));
  return new Promise(async (resolve) => {
    const res = [];
    for (let i = 0; i < taskList.length; i++) {
      const _res = await taskList[i]();
      res.push(_res);
    }
    resolve(res);
  });
}

// 并发同时执行
async function batchJobsBingfa(inputArray, doJob) {
  const taskList = inputArray.map((i) => doJob(i));
  return Promise.all(taskList);
}

// 题中给的
let now = Date.now();
async function doJob(time) {
  let startAt = Date.now() - now;
  await new Promise((resolve) => setTimeout(resolve, time));
  let endAt = Date.now() - now;
  return `Start At: ${startAt}ms, End At: ${endAt}ms`;
}
let inputArray = [200, 100, 400, 500, 300];
batchJobsOneByOne(inputArray, doJob)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

/* 依次按序执行输出如下: */
/*
[
  'Start At: 1ms, End At: 202ms',
  'Start At: 202ms, End At: 301ms',
  'Start At: 301ms, End At: 702ms',
  'Start At: 702ms, End At: 1202ms',
  'Start At: 1202ms, End At: 1503ms'
]
*/

/* 并发同时执行输出如下: */
/*
[
  'Start At: 0ms, End At: 202ms',
  'Start At: 1ms, End At: 102ms',
  'Start At: 1ms, End At: 402ms',
  'Start At: 1ms, End At: 502ms',
  'Start At: 1ms, End At: 301ms'
]
*/

/*
评分重点：
1. 依次按序执行使用 for 循环或 reduce 方法，forEach 方法不可行 [ 0-3 ]
2. 并发同时执行需要使用 Promise.all [ 0-2 ]
3. await 必须在 async 函数内部 [ 0-2 ]
4. 其他 [ 0-3 ]
*/
async function batchJobs(inputArray, doJob) {
  // 依次按序执行
  return await inputArray.reduce(async (p, item) => {
    let result = await p;
    result.push(await doJob(item));
    return result;
  }, []);
  // 或
  // let result = [];
  // for (let i = 0; i < inputArray.length; i ++) {
  //   result.push(await doJob(inputArray[i]));
  // }
  // return result;

  // 并发同时执行
  return await Promise.all(inputArray.map(async (item) => await doJob(item)));
}
