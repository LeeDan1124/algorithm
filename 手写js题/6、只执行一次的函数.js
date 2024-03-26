const once = (func) => {
   
}

const runOnce1 = once(function() {
    console.log('我只执行第一次')
})
runOnce1()  // 这次输出‘我只执行第一次’
runOnce1() // 这次不会输出

const runOnce2 = once(function() {
    console.log('我只执行第一次=====')
})
runOnce2()  // 这次输出‘我只执行第一次’
runOnce2() // 这次不会输出