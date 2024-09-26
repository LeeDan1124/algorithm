// https://labuladong.online/algo/dynamic-programming/edit-distance/#%E5%A4%87%E5%BF%98%E5%BD%95%E8%A7%A3%E6%B3%95
// https://leetcode.cn/problems/edit-distance/submissions/567340872/
function getDistance(str, targetStr){
    const cIndex = str.length - 1;
    const tIndex = targetStr.length - 1;

    // 这里的 temp 备忘录记录的是 str 里的每一项与 targetStr的每一项的编辑距离
    const temp = []
    for (let i = 0; i <= cIndex; i++) {
      temp[i] = new Array(tIndex + 1).fill(-1)
    }
    
    return dp(str, cIndex, targetStr, tIndex, temp)
}

function dp(str, cIndex, targetStr, tIndex, temp){
    if (cIndex < 0) return tIndex + 1; // str 为空，则需要插入 tIndex + 1 个字符
    if (tIndex < 0) return cIndex + 1; // targetStr 为空，则需要删除 cIndex + 1 个字符

    if (temp[cIndex][tIndex] !== -1) {
      return temp[cIndex][tIndex]
    }
  
    if (str[cIndex] === targetStr[tIndex]) {
        temp[cIndex][tIndex] = dp(str, cIndex - 1, targetStr, tIndex - 1, temp)
    } else {
        temp[cIndex][tIndex] = min(
          // 删除
          dp(str, cIndex-1, targetStr, tIndex, temp) + 1,
          // 替换
          dp(str, cIndex-1, targetStr, tIndex-1, temp) + 1,
          // 增加
          dp(str, cIndex, targetStr, tIndex-1, temp) + 1
        )
    }
    return temp[cIndex][tIndex]
}

function min(a, b, c) {
  return Math.min(a, Math.min(b, c))
}
