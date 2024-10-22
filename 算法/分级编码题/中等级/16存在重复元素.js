// https://leetcode.cn/problems/7WqeDu/
function go(nums, indexDiff, valDiff) {
  function _has(startIndex) {
    for (
      let i = startIndex + 1;
      Math.abs(startIndex - i) <= indexDiff && i < nums.length;
      i++
    ) {
      if (Math.abs(nums[startIndex] - nums[i]) <= valDiff) {
        return true;
      }
    }
    return false;
  }

  for (let i = 0; i < nums.length; i++) {
    if (_has(i)) {
      return 1;
    }
  }

  return 0;
}

console.log("🧝", go([1, 2, 1, 1], 1, 0));
