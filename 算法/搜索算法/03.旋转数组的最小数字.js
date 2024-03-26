/**
有一个长度为 n 的非降序数组，比如[1,2,3,4,5]，将它进行旋转，即把一个数组最开始的若干个元素搬到数组的末尾，变成一个旋转数组，
比如变成了[3,4,5,1,2]，或者[4,5,1,2,3]这样的。请问，给定这样一个旋转数组，求数组中的最小值。

要求：空间复杂度：O(1)，时间复杂度：O(logn)
示例1
输入：[3,4,-1,1,2]
返回值：1

输入：[3,100,200,3]
返回值：3
 */
function minNumberInRotateArray(rotateArray)
{
    // write code here

}

console.log(minNumberInRotateArray([3,4,5,1,2]))
module.exports = {
    minNumberInRotateArray : minNumberInRotateArray
};