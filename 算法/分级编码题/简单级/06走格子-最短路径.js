// https://labuladong.online/algo/dynamic-programming/minimum-path-sum/
// 走格子最短路径
var minPathSum = function(grid) {
    const finishX = grid.length - 1
    const finishY = grid[0].length - 1
    // 备忘录📝
    const temp = new Array(grid.length).fill(null).map(i => new Array(grid[0].length).fill(0))
    
    // 从(0,0)走到(x,y)要的最小路径
    function getMinSteps(x, y) {
      if (x === 0 && y === 0) {
        return grid[0][0]
      }
  
      if (x < 0 || y < 0) {
        return Number.MAX_VALUE
      }
  
      if (temp[x][y]) {
          return temp[x][y]
      }
  
      temp[x][y] = Math.min(getMinSteps(x-1, y), getMinSteps(x, y-1)) + grid[x][y]
      return temp[x][y]
    }
    return getMinSteps(finishX, finishY)
  };
