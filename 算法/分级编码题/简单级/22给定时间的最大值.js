/**
给定一个由 4 位数字组成的数组，返回可以设置的符合 24 小时制的最大时间。
24 小时格式为HH:MM ，其中 HH 在 00 到 23 之间，MM 在 00 到 59 之间。最小的 24 小时制时间是 00:00 ，而最大的是 23:59。
以长度为 5 的字符串，按 HH:MM 格式返回答案。如果不能确定有效时间，则返回空字符串。
 */

// 要考虑00:00 或者 01:02这种带0的时刻
function getMaxTime(nums) {
    // 全排列--start---
    const allList = []
    const track = []
    const used = new Array(nums.length).fill(false)
  
    const backTrack = (nums, track, used) => {
      if (track.length === nums.length) {
        allList.push(track.slice())
        return
      }
  
      for (let i = 0; i < nums.length; i++) {
        if (used[i]) {
          continue
        }
        used[i] = true
        track.push(nums[i])
        backTrack(nums, track, used)
        used[i] = false
        track.pop()
      }
      
    }
    backTrack(nums, track, used)
    // 全排列--end---
    
    let maxHour = -1
    let maxMiniute = -1
    allList.forEach((item) => {
      const [x, y, z, k] = item
      const hour = +`${x}${y}`
      const miniute = +`${z}${k}`
      if (hour < 24 && miniute < 60) {
        if (hour === maxHour) {
          maxMiniute = Math.max(miniute, maxMiniute)
        } else if (hour > maxHour) {
          maxHour = hour
          maxMiniute = miniute
        }
      }
    })
    return maxHour >= 0 ? `${maxHour.toString().padStart(2,0)}:${maxMiniute.toString().padStart(2,0)}` : ''
  }
  