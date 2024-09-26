/**
 给你一个整数数组 nums 和一个整数 k ，编写一个函数来判断该数组是否含有同时满足下述条件的连续子数组：
子数组大小 至少为 2 ，且
子数组元素总和为 k 的倍数。
如果存在，返回 1 ；否则，返回 0 。
如果存在一个整数 n ，令整数 x 符合 x = n * k ，则称 x 是 k 的一个倍数。0 始终视为 k 的一个倍数。

暴力解
https://leetcode.cn/problems/continuous-subarray-sum/ 过不了 leetcode 上所有的用例
 */
function hasChildList(nums, k) {
  let res;

  for (let i = 0; i < nums.length; i++) {
    let curSum = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      curSum += nums[j];
      if (curSum % k === 0) {
        return 1;
      }
    }
  }
  return 0;
}
