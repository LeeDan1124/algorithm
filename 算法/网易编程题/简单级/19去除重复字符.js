// https://leetcode.cn/problems/remove-duplicate-letters/
// https://labuladong.online/algo/frequency-interview/remove-duplicate-letters/
/**
给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的
字典序
最小（要求不能打乱其他字符的相对位置）。

示例 1：

输入：s = "bcabc"
输出："abc"
示例 2：

输入：s = "cbacdcbc"
输出："acdb"
 */
var removeDuplicateLetters = function (str) {
  const visitedMap = new Map()
  let resStack = []

  // 统计字符串中每个字符出现的次数
  const countMap = new Map()
  for (let i = 0; i < str.length; i++) {
    countMap.has(str[i]) ? countMap.set(str[i], countMap.get(str[i]) + 1) : countMap.set(str[i], 1)
  }
  
  for (let i = 0; i < str.length; i++) {
    // 每遍历过一个字符，都将该字符出现次数减一
    countMap.set(str[i], countMap.get(str[i]) - 1)
    
    if (!visitedMap.get(str[i])) {
      // 如果当前字符小于栈顶元素，且栈顶元素在后面还会出现,那就把栈顶的元素弹出来，并更新visitedMap
      while (str[i] < resStack[resStack.length - 1] && countMap.get(resStack[resStack.length - 1]) > 0) {
        visitedMap.set(resStack.pop(), false)
      }
      visitedMap.set(str[i], true)
      resStack.push(str[i])
    }
  }
  return resStack.join('')
};

console.log('🤦‍♂️', removeDuplicateLetters('bcabc'))