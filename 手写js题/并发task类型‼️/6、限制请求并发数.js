let p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1)
    }, 100)
})

let p2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(2)
    }, 1000)
})


let p3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(3)
    }, 200)
})

let p4 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(4)
    }, 500)
})
new RequestLimit(3, [p1, p2, p3, p4], (res) => {
    console.log(res) // [1, 2, 3, 4]
})