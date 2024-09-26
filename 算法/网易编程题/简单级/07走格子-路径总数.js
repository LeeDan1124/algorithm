/**
 * 一个机器人位于一个m*n网格的左上角 （起始点在下图中标记为 “Start” ）
 * 机器人每次只能向下或者向右移动一步（每个格子只能走一次）
 * 机器人试图达到网格的右下角（在下图中标记为 “Finish” ）
 * 问总共有多少条不同的路径？
 */
/*
  最后格子的条数 = 左边格子的路径条数 + 上边格子的路径条数
*/
function getSteps(m, n) {
    // 从(0,0)到(x,y)的路径总数
    function func(x, y) {
      if (x === 0 && y === 0) return 1
 
      if (x < 0 || y < 0) {
        return 0
      }
 
      return func(x-1, y) + func(x, y-1)
    }
 
   return func(m-1, n-1)
}