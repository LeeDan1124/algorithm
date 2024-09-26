/**
 * https://leetcode.cn/problems/sort-characters-by-frequency/ leetcode 里不要求字典序
给定一个字符串 s ，根据字符出现的 频率 对其进行 降序排序 。一个字符出现的 频率 是它出现在字符串中的次数。
返回 已排序的字符串。注：如果出现次数相同， 则按字典序升序排列，如果有多个答案，返回其中任何一个。
 */
function getSortedStr(str) {
    const countsMap = new Map()
    for (let i = 0; i < str.length; i++) {
      countsMap.set(str[i], countsMap.get(str[i]) ? countsMap.get(str[i]) + 1 : 1)
    }
  
    // Array.from(countsMap.entries()) ===> [['t', 1], ['r', 1], ['e', 2]]
    const sorted = Array.from(countsMap.entries()).sort((a, b) => {
      // 如果次数一样，比较字典序，注意这里需要写成b[0] > a[0] ? -1 : 1，而不能直接写b[0] > a[0]判断
      return b[1] == a[1] ? b[0] > a[0] ? -1 : 1 : b[1] - a[1];
    })
    
    return sorted.reduce((pre, cur) => {
      const [key, nums] = cur
      return pre + key.repeat(nums)
    }, '')
}

console.log('👩‍💻', getSortedStr('tree'));