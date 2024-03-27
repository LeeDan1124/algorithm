// 46  47  77
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
// 示例:

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
/**
    1           2         3         4
  2 3 4         3 4       4         null
 34 4 null      4 null    null
 */

// 组合：只选当前值后面的数
function zuhe(n, k) {
  const result = []

  const backTrack = (curNum, track) => {
    
    if (track.length === k) {
      result.push([...track])
    } else {
      for (let i = curNum; i <= n; i++) {
        track.push(i)
  
        backTrack(i+1, track)
  
        track.pop()
      }
    }
  }

  backTrack(1, [])
  return result
}


console.log(zuhe(4, 2))