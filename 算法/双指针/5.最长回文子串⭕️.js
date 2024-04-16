/**
 * 回文是一个顺着读和反过来读都一样的字符串，比如 "madam"、"我是我" 等。给定一个字符串，求它的最长回文子串的长度。
 */

function getCircleStr(str, curPoint = 0) {
  let left = curPoint;
  let right = curPoint;

  // 这里str[left] === str[right]考虑奇数回文
  // str[left] === str[right + 1]考虑偶数回文
  while (
    (str[left] === str[right] || str[left] === str[right + 1]) &&
    left >= 0 &&
    right <= str.length - 1
  ) {
    left--;
    right++;
  }

  return str.substring(left + 1, right);
}

function longestPalindrome(str) {
  // 补全代码
  if (!str || str.length === 1) return str;

  let maxStr = "";
  for (let i = 0; i < str.length; i++) {
    const curStr = getCircleStr(str, i);
    maxStr = curStr.length > maxStr.length ? curStr : maxStr;
  }
  return maxStr;
}

console.log("Test Case 1:", longestPalindrome("1aba"));
console.log("Test Case 2:", longestPalindrome("scewx2abba2xw"));
console.log("Test Case 3:", longestPalindrome("我是我"));

/* 输出如下: */
/*
Test Case 1: aba
Test Case 2: 2abba2
*/
