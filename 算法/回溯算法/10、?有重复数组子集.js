/*
90
给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
*/
/**  []
      1       2         2
      2 2     2
      2      
 */

function allSonList(arr) {
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

  backTrack(arr, [], [])
  return result
}

console.log(allSonList([1,2,2]))