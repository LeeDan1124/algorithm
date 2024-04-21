/**给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

示例 1:

输入: s = "cbaebabacd", p = "abc"
'fawrsacba'
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 示例 2:

输入: s = "abab", p = "ab"
输出: [0,1,2]
解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。 */

function getStr(s, p) {

  if (!s || !p || typeof s !== 'string' || typeof p !== 'string') return []

  const result = []

  const targetMap = p.split('').reduce((pre, cur) => {
    if (typeof pre[cur] !== 'number') {
      pre[cur] = 0
    }
    pre[cur] = pre[cur] + 1
    return pre
  }, {})
  const targetNumber = Object.keys(targetMap).length

  let left = 0, right = 0, curObj = {}, curNumber = 0

  while(right < s.length) {

    const r = s[right]
    if (p.includes(r)) {

      if (typeof curObj[r] !== 'number') {
        curObj[r] = 0
      }
      curObj[r] = curObj[r] + 1

      if (curObj[r] === targetMap[r]) {
        curNumber++
      }

      // TODO 当超过之后也要做处理
      // if (curObj[r] > targetMap[r]) {
        
      // }

      while(curNumber === targetNumber) {
        result.push(left)
        const ls = s[left]
        if (curObj[ls] === targetMap[ls]) {
          curObj[ls] = curObj[ls] - 1
          curNumber--
        }
        left++
      }
      right++

    } else {
      right++
      left = right
      curObj = {}
      curNumber = 0
    }
  }

  return result
}

console.log(getStr('cbaebabacd', 'abc'))
// console.log(getStr('fawrsacba', 'abc'))
// console.log(getStr('abab', 'ab'))