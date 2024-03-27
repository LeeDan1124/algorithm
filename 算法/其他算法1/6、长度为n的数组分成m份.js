/*
8、给一个长度为n的数组，让它分成m份，使这m份的和相等，求最大的m值
例如：[3, 2, 4, 3, 6]
m=1时 {3, 2, 4, 3, 6}
m=2时 {3,6}{2,4,3}
m=3时 {3,3}{2,4}{6}
所以m=3
*/

/**
 * 解析：[2,3,3,4,6]
 * [6]
 * [2,3,3,4]
 * []
 * sum(arr) = 18
 * m=1:分一份，和为sum(arr)/1 = 18
 * m=2 分两份 每份的和为sum(arr)/2 = 9  ===> 和为9的组合
 * m=3 分三份 每份的和为sum(arr)/3 = 6
 * m=4 分四份 每份的和为sum(arr)/4 = 4.5【小数不行】
 * m=5 分五份 每份的和为sum(arr)/5 = 3.6 [小数不行]
 * ...
 * m=arr.length 分成arr.length份 
 */

function getMax(arr) {
  const arrLength = arr.length

  if (!arrLength) return 0

  const _arr = arr.sort()
  let arrSum = 0
  for (let i = 0; i < arr.length; i++) {
    arrSum = arrSum + arr[i]
  }
  let res = 1

  /**
   * @param {sum} 每份的和
   * @param {i} 分成几份
   * @returns true/false 是否能分开
   */
  const getSumList = (sum, i) => {

    return true / false
  }

  // iNum: 分成iNum份 从分成2份开始验证，1份肯定能分
  for (let iNum = 2; iNum <= arrLength; iNum++) {
    const everySum = arrSum / iNum,
          yushu = arrSum % iNum

    if (!!yushu) continue

    res = getSumList(everySum, iNum) ? iNum : res
  }
}