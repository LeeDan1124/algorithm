/**
 给定一组非0整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最小的整数。
注意：
输入整数数组中，可能存在负数，但最多只会有一个负数
输出结果可能非常小，所以你需要返回一个字符串而不是整数。

输入格式:
一个整数数组，每个元素其间以“空格”分隔

输出格式:
最小数的字符串

输入样例1:
在这里给出一组输入。例如：
10 2

输出样例1:
在这里给出相应的输出。例如：
102

 */

function selfSort(arr, isFlag) {
  let res = "";
  // 负数
  if (isFlag) {
    const flagIndex = arr.indexOf(arr.find((x) => x.indexOf("-") !== -1));
    res += arr[flagIndex];
    arr.splice(flagIndex, 1);

    arr.sort((a, b) => {
      return Number(b + a) - Number(a + b);
    });
  } else {
    arr.sort((a, b) => {
      return Number(a + b) - Number(b + a);
    });
  }
  return (res += arr.join(""));
}
