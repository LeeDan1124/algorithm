
// https://leetcode.cn/problems/3sum/
function threeSum(nums) {
    const arr = nums.sort((a, b) => a - b);
    const res = [];
    const resMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        const otherNumsSum = 0 - arr[i];
        const otherNums = twoSum(i + 1, arr, otherNumsSum);
        
        otherNums.forEach(item => {
          const numKey = `${arr[i]}${item.join('')}`;
          if (!resMap.get(numKey)) {
              res.push([arr[i], ...item]);
              resMap.set(numKey, true);
          }
        })
    }
    return res;
}

function twoSum(startIndex, nums, target) {
    let left = startIndex;
    let right = nums.length - 1;
    const res = [];

    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum < target) {
            left++;
        } else if (sum > target) {
            right--;
        } else {
            res.push([nums[left], nums[right]]);
            left++;
            right--;
        }
    }
    return res;
}
