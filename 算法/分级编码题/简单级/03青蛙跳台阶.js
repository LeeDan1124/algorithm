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


// 台阶 1   2       3       4   5
// 方法 1   1+1     2+1     3+2
// 到达第 n 阶，要么直接从 n-1 一步跳上来，要么从 n-2跳两节上来
// dp[n] = dp[n-1]+dp[n-2]
const getJumpStep = (steps) => {
  if (steps <= 2) return steps
  
  const dp = [1, 1, 2]
  for (let i = 3; i <= steps; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[steps]
}

console.log(getJumpStep(2));
console.log(getJumpStep(3));
console.log(getJumpStep(4));
console.log(getJumpStep(14));
