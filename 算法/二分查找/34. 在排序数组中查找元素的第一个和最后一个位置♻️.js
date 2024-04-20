/**
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

 

示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]

 */
// 一次对，但是比较经典，所以可以重复做一下
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    if (!nums.length) return [-1, -1]

    let L = -1
    let R = -1

    let left = 0
    let right = nums.length - 1

    // 找左边界 right指针一直往左逼近，直到逼出数组，这时left指向的数要么是目标值，要么比目标值大
    while(left <= right) {
        let mid = Math.floor((left + right)/2)

        if (nums[mid] >= target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        }
    }

    L = nums[left] === target ? left : -1
    // left逼到出去了还没有，那么没这个数
    // if (left > nums.length - 1) {
    //     L = -1
    // }


    // 找右边界 left指针一直往右逼近，直到逼出数组，这时right指向的数要么是目标值，要么比目标值小
    left = 0
    right =  nums.length - 1
    while(left <= right) {
        let mid = Math.floor((left + right)/2)

        if (nums[mid] > target) {
            right = mid - 1
        } else if (nums[mid] <= target) {
            left = mid + 1
        }
    }

    R = nums[right] === target ? right : -1
    // right逼出去了，还没有，那么没有这个数
    // if (right < 0) {
    //     R = -1
    // }

    return [L, R]

};