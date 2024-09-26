
/**
 * 给定n个物品和一个容量为C的背包，物品i的重量是Wi，其价值为Vi，背包问题是如何选择入背包的物品，使得装入背包的物品的总价值最大。
 * 注意：你可以将物品的一部分装入背包，但不能重复装入。
 */
// 略臃肿
function getBiggestPrice(n, C, Weights, Prices){
    const matrix = []
    // 用来存储当前位置最大价值时还有多少空间没填满
    const remianWeight = []
  
    for(let curObj = 0; curObj < n; curObj++) {
      matrix[curObj] = []
      remianWeight[curObj] = []
      for(let curMaxWeight = 0; curMaxWeight <= C; curMaxWeight++) {
        const curWeight = Weights[curObj]
        const curPrice = Prices[curObj]
  
        if (curObj === 0) {
          matrix[curObj][curMaxWeight] = 
            curWeight <= curMaxWeight ? curPrice : curPrice/curWeight * curMaxWeight
          
          remianWeight[curObj][curMaxWeight] = 
            curWeight <= curMaxWeight ? curMaxWeight - curWeight : 0
        } else {
          
          // 优先考虑放置当前物品时的价值
          let totalP = 0
          let remain1 = 0
          if (curWeight <= curMaxWeight) {
            // 当前物品的价值
            const p1 = curPrice
            // 还可以装的其余物品的价值
            const otherWeight = curMaxWeight - curWeight
            const p2 = otherWeight > 0 ? matrix[curObj-1][otherWeight] || 0 : 0
            totalP = p1 + p2
          } else {
            totalP = curPrice/curWeight * curMaxWeight
          }
  
          // 优先除当前物品外的其余物品的价值
          let remain2 = 0
          let partP = matrix[curObj-1][curMaxWeight]
          let curRemainWeight = remianWeight[curObj-1][curMaxWeight]
          if (curRemainWeight > 0) {
            partP += curPrice/curWeight * Math.min(curRemainWeight, curWeight)
            remain2 = curRemainWeight > curWeight ? curRemainWeight - curWeight : 0
          }
  
          matrix[curObj][curMaxWeight] = Math.max(
            // 放下当前物品时的价值
            totalP,
            // 放部分当前物品时的价值
            partP
          )
          remianWeight[curObj][curMaxWeight] = partP >= totalP ? remain2 : remain1
        }
      }
    }
  
    return parseInt(matrix[n-1][C])
}
  