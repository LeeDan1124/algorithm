// 实现一个add方法有如下效果add(1,2).add(3).add(4).ouput()，在output的时候输出前边数的和
function add(...args) {

  let params = [...args]

  const innerAdd = (...innerArgs) => {
    params = [...params, ...innerArgs]
    return add(...params)
  }

  const output = () => {
    return params.reduce((pre, cur) => pre + cur)
  }

  return {
    add: innerAdd,
    output
  }
}

console.log(add(1,2).add(3).add(4).output())
