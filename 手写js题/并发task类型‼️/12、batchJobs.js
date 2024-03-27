// 实现函数 async function batchJobs(inputArray, async function doJob) => resultArray, 遍历 inputArray，
// 针对每个数组元素 item，执行 async function doJob(item) => result ，分别写出依次按序执行、并发同时执行，
// 全部执行完毕后，将每一项的执行结果 result 以数组形式合并返回 resultArray

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



//--------自己实现的start---------------------------//
// 并发1个
async function batchJobs(inputArray, doJob) {
  // 补全代码

  const queue = inputArray.reduce((pre, cur) => {
    pre.push(() => doJob(cur))
    return pre
  }, [])

  const resultArray = []

  let runningIndex = 0
  const limit = 1

  return new Promise(async (resolve, reject) => {
    try {
      while(runningIndex < limit && !!queue.length) {
        runningIndex++
        const curTask = queue.shift()
        const res = await curTask().catch(e => {
          reject(e)
        }) 
        resultArray.push(res)
        runningIndex--
      }
      resolve(resultArray)
    } catch (e) {
      reject(e)
    }
  })
}

// 全部并发执行
async function batchJobs(inputArray, doJob) {
  // 补全代码
  const queue = inputArray.reduce((pre, cur) => {
    pre.push(doJob(cur))
    return pre
  }, [])

  return Promise.all(queue)
}
//--------自己实现的end---------------------------//
 
let inputArray = [200, 100, 400, 500, 300];
 
let now = Date.now();
 
async function doJob(time) {
  let startAt = Date.now() - now;
  await new Promise(resolve => setTimeout(resolve, time));
  let endAt = Date.now() - now;
  return `Start At: ${startAt}ms, End At: ${endAt}ms`;
}
 
batchJobs(inputArray, doJob).then((result) => {
  console.log(result);
}).catch((err) => {
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