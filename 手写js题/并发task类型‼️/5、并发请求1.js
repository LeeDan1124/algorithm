class Scheduler{
}

let p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})

let p2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(2)
    }, 200)
})


let p3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(3)
    }, 400)
})

let p4 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(4)
    }, 500)
})

// 依次执行，执行结束后在callback中返回
new Scheduler(2, [p1, p2, p3, p4], (res) => {
    console.log(res) // [1, 2, 3, 4]
})