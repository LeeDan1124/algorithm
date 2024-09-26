// 题目意思：找到给定数组里的连续索引子数组，使子数组的元素和在给定的区间内[lower, upper],计算子数组的个数
// 暴力循环☹️-过不了 leetcode全部用例
// https://leetcode.cn/problems/count-of-range-sum/submissions/567862314/
function getNum(arr, lower, upper) {
  let resCount = 0;

  for (let i = 0; i < arr.length; i++) {
    let curSum = 0;
    for (let j = i; j < arr.length; j++) {
      curSum += arr[j];
      if (curSum >= lower && curSum <= upper) {
        resCount++;
      }
    }
  }
  return resCount;
}
