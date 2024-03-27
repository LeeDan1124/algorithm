/**
 * 78
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]
 */
/**         []
      1      2      3
      2 3    3     
      3           
 */

function getAllSon(nums) {

  const result = []

  const backTrack = (remaining, track) => {
    result.push([...track])

    for (let i = 0; i < remaining.length; i++) {
      track.push(remaining[i])

      const _remaining = remaining.slice(i+1)
      backTrack(_remaining, track)

      track.pop()
    }
  }

  backTrack(nums, [])
  return result
}

console.log(getAllSon([1,2,3]))