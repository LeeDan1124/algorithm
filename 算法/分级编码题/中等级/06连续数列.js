// 给定一个整数数组，找出总和最大的连续数列，并返回总和。
// 输入：[-2,1,-3,4,-1,2,1,-5,4]
// 输出：6


//nums: -2,          1,        -3,               4,             -1,   2,   1,    -5,    4
//dp：  -2,  max(1,-2+1)=1,  max(-3, -3+1)=-2,   max(4, 4-2)=4    ……
// dp 里的每一项存储的是，第 i 项时，max(nums[i], nums[i]+sum[i-1]),最后取最大的 dp
function getMaxSum(nums) {
  let maxSum = -Infinity;
  const dp = [];
  for (let i = 0; i < nums.length; i++) {
    dp[i] = i === 0 ? nums[i] : Math.max(nums[i], nums[i] + dp[i - 1]);
    maxSum = Math.max(maxSum, dp[i]);
  }
  return maxSum;
}