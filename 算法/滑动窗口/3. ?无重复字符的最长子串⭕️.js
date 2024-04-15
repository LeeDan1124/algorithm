/**给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。 */

function findLongStr(s) {
     if (!s || typeof s !== 'string') return 0

     const map = new Map()
     let left = 0, right = 0, longStr = -Infinity

     while(right < s.length) {
          const curS = s[right]
          if (map.has(curS)) {

               while(map.has(curS)) {
                    longStr = right - left > longStr ? right - left : longStr
                    const ls = s[left]
                    if (map.has(ls)) {
                         map.set(ls, map.get(ls) - 1)
                         if (map.get(ls) === 0) {
                              map.delete(ls)
                         }
                    }
                    left++
               }

          } else {
               map.set(curS, 1)
               right++
          }
     }
     return right - left > longStr ? right - left : longStr

}     

console.log(findLongStr('abcabcbb'))
console.log(findLongStr('bbbbb'))
console.log(findLongStr('aab'))