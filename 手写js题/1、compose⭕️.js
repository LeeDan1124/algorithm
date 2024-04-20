// 用法如下:
function fn1(x) {
  console.log('🍎')
  return x + 1;
}
function fn2(x) {
  console.log('🍌')
  return x + 2;
}
function fn3(x) {
  console.log('🍊')
  return x + 3;
}
function fn4(x) {
  console.log('🍐')
  return x + 4;
}
function compose(...funs) {
  return (n) => {
    return funs.reduceRight((pre, cur, index) => {
      pre = cur(pre)
      return pre
    }, n)
  }
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11


function _compose(...funs) {
  return (n) => {
    return funs.reduce((pre, cur, index) => {
      pre = cur(pre)
      return pre
    }, n)
  }
}

const b = _compose(fn1, fn2, fn3, fn4);
console.log(b(1)); // 1+1+2+3+4=11
