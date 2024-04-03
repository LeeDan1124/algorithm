// 修改a.js中的代码，实现b.js在请求回来数据后在发起下一个请求
// a.js

let limitRequest = (url) => {
  const queue = []
  queue.push(() => {
    return myFetch(url)
  })

  const limit = 1
  let running = 0

  const RunTask = async () => {
    if (queue.length && running < limit) {
      running++
      const curQueue = queue.shift()
      curQueue().then(() => {
        running--
        RunTask()
      })
    }
  }

  RunTask()
}



function myFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 2000)
  })
}

let isRunning = false
const tasks = []
const limitRequest1 = (url) => {

  // tasks.push(() => myFetch(url))

  // const runTask = async () => {
  //   if (!tasks.length) return
  //   const curTask = tasks.shift()
  //   await curTask()
  //   runTask()
  // }

  // setTimeout(() => {
  //   runTask()
  // })
  if (isRunning) {
    tasks.push(() => myFetch(url))
  }
  while(!isRunning) {
    return new Promise((resolve, reject) => {
        isRunning = true
        try {
          myFetch(url)
            .then((res) => {
              resolve(res)
            })
            .catch(e => {
              reject(e)
            })
            .finally(() => {
              isRunning = false
              const curTask = tasks.shift()
            })
        } catch (e) {
          reject(e)
          isRunning = false
        }
      })
  }
  
}

// b.js
limitRequest1('/1').then(res => {
  console.log(res, '----res1')
})
limitRequest1('/2').then(res => {
  console.log(res, '----res2')
})
limitRequest1('/3').then(res => {
  console.log(res, '----res3')
})


// 主 task1 task2 task3
// 微
// 宏 run1 run2 run3