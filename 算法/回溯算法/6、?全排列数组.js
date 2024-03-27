/**
 * 给定的数组，生成包含数组中所有元素的所有可能排列的过程。每个排列都是数组中元素的不同排列顺序。
 * 例如，对于数组[1,2,3]的全排列包括
 * [1,2,3]
 * [1,3,2]
 * [2,1,3]
 * [2,3,1]
 * [3,1,2]
 * [3,2,1]
 */
function func(arr) {
  const result = []

  /**
   * @param 选择列表 remaining 
   * @param 路径 track 
   */
  function backTrack(remaining, track) {
    if (remaining.length === 0) {
      result.push([...track]) 
    } else {
      for (let i = 0; i < remaining.length; i++) {
        // 选择
        track.push(remaining[i])
  
        const _remaining = [...remaining.slice(0, i), ...remaining.slice(i+1)]
        backTrack(_remaining, track)

        // 回溯
        track.pop()
      }
    }
  }

  backTrack(arr, [])
  return result
}
console.log(func([1,2,3]))