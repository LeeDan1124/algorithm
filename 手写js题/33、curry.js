function curry(fn, ...outterArgs) {}

// 用法如下：
const add = (a, b, c, d) => a + b + c + d;
const a = curry(add);
console.log(a(2)(3)(4)(5)); // 14

const mul = (a, b, c, d, e) => a * b * c * d * e;
const b = curry(mul, 1);
console.log(b(2)(3, 4, 5)); // 120
console.log(b(2, 3)(4, 5)); // 120
