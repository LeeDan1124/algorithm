// 13
// 11 - 13 = -2
// 15 - 12 = 2
/**
 * 
给定两个整数数组，请交换一对数值（每个数组中取一个数值），使得两个数组所有元素的和相等。

返回一个数组，第一个元素是第一个数组中要交换的元素，第二个元素是第二个数组中要交换的元素。
若有多个答案，返回所有满足条件的答案。若无满足条件的数值，不输出。

若有多个答案，请返回所有答案，多组答案输出顺序按每组答案的第一个元素进行升序输出（若第一个元素相同，则继续按照每组第二个元素升序输出），每组答案单独一行显示，如果结果中有重复答案，请仅显示一组。
若无满足条件的数值，不输出。

https://leetcode.cn/problems/sum-swap-lcci/ 和 leetcode 上的要求不大一样
 */
function getTransferNumList(arr1, arr2) {
    // 两个数组的平均值
    const avarageSum = [...arr1, ...arr2].reduce((pre, cur) => pre += cur, 0) / 2
    // 如果平均值是小数，无解
    if (Math.ceil(avarageSum) !== Math.floor(avarageSum)) {
      return ''
    }
  
    const sum1 = arr1.reduce((pre, cur) => pre += cur, 0)
  
    const chazhi = sum1 - avarageSum
    const res = new Set()
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] - arr2[j] === chazhi) {
          res.add(`${arr1[i]} ${arr2[j]}`)
        }
      }
    }
    return [...res].sort((a, b) => {
      const [an1, an2] = a.split(' ').map(x => +x)
      const [bn1, bn2] = b.split(' ').map(x => +x)
      return an1 === bn1 ? an2 - bn2 : an1 - bn1
    })
  }
  