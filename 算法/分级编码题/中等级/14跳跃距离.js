/**
 https://leetcode.cn/problems/jump-game/submissions/572995447/
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  if (nums.length === 1) return true;
  if (nums[0] === 0) return false;

  const visited = new Array(nums.length).fill(false);

  // 索引队列
  const queue = [0];

  while (queue.length) {
    const curIndex = queue.pop();
    const curStep = nums[curIndex];

    visited[curIndex] = true;

    for (let i = 1; i <= curStep; i++) {
      const jump2Index = curIndex + i;
      if (visited[jump2Index]) {
        continue;
      }
      if (jump2Index === nums.length - 1) {
        return true;
      }
      queue.push(jump2Index);
    }
  }
  return false;
};
