/**
对于给定的正整数k，将其表示为一个正整数序列之和，且该序列中相邻元素的差值为等差分布（等差分布从1开始，差值为1，即1,2,3,...,）

注意：请打印出所有可能的序列（打印多个序列时，按照首个数字从小到大依次打印）

例如：
示例1输入：
k=26
示例1输出：
4,5,7,10
该序列的和为26，相邻元素的差值为1,2,3

示例2输入：
k=55
示例2输出
7,8,10,13,17
17,18,20
27,28
即，有3个序列满足条件，其和均为55，且相邻元素的差值为等差分布（从1开始）
注：若没有满足条件的序列，则打印空串。
 */
function getAllList(sum) {
  const res = [];

  for (let startNum = 1; startNum < sum; startNum++) {
    const curList = []; // 存序列

    let curNumber = startNum;
    let curSum = 0;
    let diff = 1;

    while (curSum < sum && curNumber < sum) {
      curSum += curNumber;
      curList.push(curNumber);

      if (curSum === sum) {
        res.push(curList);
        break;
      }

      curNumber += diff;
      diff++;
    }
  }

  return res;
}
