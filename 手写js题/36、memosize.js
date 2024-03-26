const memoize = (fun, resolver) => {

}

const obj = {a: 1, b: 2}
const arr = [100, 200]

const fun1 = memoize((obj) => Object.values(obj))
const fun2 = memoize((arr) => arr.map(i => i * 2))

console.log(fun1(obj)) // [1, 2]
console.log(fun2(arr))  // [200, 400]

// memoize需要有记忆功能，如果之前输入过该健，则记下来，再次调用时会返回上一次缓存的结果
obj.a = 2 
console.log(fun1(obj))  // [1, 2]

// 把obj关联key值 所对应的值修改为[s, k]
fun1.cache.set(obj, ['s', 'k'])
console.log(fun1(obj)) // [s, k] 