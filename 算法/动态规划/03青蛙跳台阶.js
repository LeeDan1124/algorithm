/**
 *  青蛙一次跳一节台阶，也可以跳两节，问青蛙跳到第n节台阶时又几种方式
 */

/**
阶梯数 ---> 几种方式
  t[1]         1
  t[2]         t[1] + 1 = 2
  t[3]         t[2] + t[1] = 3
  t[4]         t[3] + t[2] = 5
  ...
  t[n]         t[n-1] + t[n-2]
 */

// 写法1
function getJumpStep(n) {
  
}

// 写法2
const numWays = (n) => {
 
};

console.log(getJumpStep(2), numWays(2));
console.log(getJumpStep(3), numWays(3));
console.log(getJumpStep(4), numWays(4));
console.log(getJumpStep(14), numWays(14));
