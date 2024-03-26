const getData = (num) => new Promise(resolve => setTimeout(() => resolve(num * 2), 1000))

async function runAwait() {
    let res1 = await getData(1)
    console.log(res1)   // 1秒后输出 2
    let res2 = await getData(res1)
    console.log(res2)   // 2秒后输出 4
}
// runAwait()

// 使用Generator实现await的功能，
function* generator() {
    let res1 = yield getData(1)
    let res2 = yield getData(res1)
    return res2
}

// ****** 实现await的思想就是将这一部分代码进行自执行 ******
let it = generator()            // 生成迭代器

let g1 = it.next()              // { value: Promise { <pending> }, done: false }
g1.value.then(resp1 => {
    console.log(resp1)          // 2

    let g2 = it.next(resp1)     // res1给next、yield传参 { value: Promise { <pending> }, done: false }
    g2.value.then(resp2 => {
        console.log(resp2)      // 4

        let g3 = it.next(resp2) 
        console.log(g3)         // { value: 4, done: true }
    })
})



/**
 * async/await 是语法糖，可以使用Generator函数实现，即执行生成器
 * 高阶函数：传入一个函数，返回一个函数【传入一个generator函数，返回一个函数】
 * 1、async关键字修饰的函数返回的是一个promise实例，即myAsync执行后应返回一个promise实例
 */
function runGeneSelf(gen) {
    return function () {
        // 1、生成迭代器
        const it = gen.call(this, arguments)

        return new Promise((resolve, reject) => {
            function run (action, nextArgs) {
                let g

                // try-catch 生成器可能返回reject态的promise
                try {
                    // it.next(args) 或者it.throw(args) g：{done: true/false, value: Promise/普通值}
                    g = it[action](nextArgs)
                } catch (e) {
                    reject(e)
                }

                const { value, done } = g
                if (done) {
                    //生成器已经执行完，此时返回{done:true, value:……}中的value即可
                    resolve(value)
                } else {
                    // 生成器还没执行完，还需要继续执行next
                    // 此时value值应该被包装成一个Promise，因为在async/await中，await后面接受的是一个promise
                    return Promise.resolve(value).then(res => {
                        //  上一个异步请求回来的值作为下一个请求的参数传入
                        run('next', res)
                    }, err => {
                        run('throw', err)
                    })
                }
            }
            run('next')
        })
    }
}
let myAsync = runGeneSelf(() => generator('iii'))

myAsync().then(res => {
    console.log(res, '--------')    // 4 
})
