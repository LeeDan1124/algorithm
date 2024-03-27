/*
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
示例 1：

输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
*/
//   1          1           2
// 1   2      1    2      1    1
// 2   1      2    1      1    1  

function allSorts(arr) {
  const result = []
  const curTracks = []

  const backTrack = (remaining, track) => {
    if (remaining.length === 0 && !curTracks.includes(track.join('->'))) {
      result.push([...track])
      curTracks.push(track.join('->'))
    } else {
      for (let i = 0; i < remaining.length; i++) {
        track.push(remaining[i])

        const _remaining = [...remaining.slice(0, i), ...remaining.slice(i+1)]
        backTrack(_remaining, track)

        track.pop()
      }
    }
  }

  backTrack(arr, [])
  return result
}

console.log(allSorts([1,1,3]))