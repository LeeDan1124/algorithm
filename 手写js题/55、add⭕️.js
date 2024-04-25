// 实现一个add方法有如下效果add(1,2).add(3).add(4).ouput()，在output的时候输出前边数的和
// 解法1:
function add(...args) {
  let params = [...args];

  const innerAdd = (...innerArgs) => {
    params = [...params, ...innerArgs];
    return add(...params);
  };

  const output = () => {
    return params.reduce((pre, cur) => pre + cur);
  };

  return {
    add: innerAdd,
    output,
  };
}
console.log(add(1, 2).add(3).add(4).output());

// 解法2:
class Add {
  constructor(args) {
    this.params = args;
  }
  add(...innerArgs) {
    this.params.push(...innerArgs);
    return this;
  }

  output() {
    return this.params.reduce((pre, cur) => (pre += cur), 0);
  }
}
function add(...args) {
  return new Add(args);
}

console.log(add(1, 2).add(3).add(4).output());
