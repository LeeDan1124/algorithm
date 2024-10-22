/**
 假设你正在使用一款版本控制系统，这款系统使用两个字符串A和B来表示两个版本内容。这两个字符串的长度都不超过1000。
 你的任务是计算出这两个版本之间的最长公共子序列长度，以便更好地理解这两个版本之间的差异。请注意，子序列的字符不需要在原始字符串中连续。

 例如，假设输入两个版本，其内容分别为 "abcfbcab" 和 "bdcabdfcab"，那么 "bca" 是一个公共子序列，
"abcab" 也是一个公共子序列，其中 "abfcab" 是这两个版本之间的最长公共子序列，输出的长度为6


输入格式:
第1行：表示第一个版本代码文件的字符串
第2行：表示第二个版本代码文件的字符串

输出格式:
输出这两个版本的最长公共子序列长度


输入样例1:
在这里给出一组输入。例如：
abcfbcab
bdcabdfcab

输出样例1:
在这里给出相应的输出。例如：
6
 */

// https://labuladong.online/algo/dynamic-programming/longest-common-subsequence/#%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%AD%90%E5%BA%8F%E5%88%97
function getLCS(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  const temp = new Array(len1).fill(null).map((x) => new Array(len2).fill(-1));

  function dpFun(str1, i, str2, j) {
    if (i >= len1 || j >= len2) {
      return 0;
    }

    if (temp[i][j] !== -1) {
      return temp[i][j];
    }

    // 当前字符一样
    if (str1[i] === str2[j]) {
      temp[i][j] = dpFun(str1, i + 1, str2, j + 1) + 1;
    } else {
      temp[i][j] = Math.max(
        // str1在里面
        dpFun(str1, i, str2, j + 1),
        // str2在里面
        dpFun(str1, i + 1, str2, j)
        // 都不在里面
        // dpFun(str1, i + 1, str2, j + 1)
      );
    }
    return temp[i][j];
  }

  return dpFun(str1, 0, str2, 0);
}
