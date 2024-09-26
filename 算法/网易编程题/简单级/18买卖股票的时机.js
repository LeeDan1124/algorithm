// 暴力循环法，过不了 leetcode 的全部用例
var maxProfit = function (prices) {
  // 保存能获取到的最大利益
  let maxProfit = 0

  for(let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const curProfit = prices[j] - prices[i]
      maxProfit = Math.max(curProfit, maxProfit)
    }
  }
  return maxProfit
};


// 方案二：贪心策略，在最低点买入
var maxProfit2 = function(prices) {
  let profit = 0
  let cost = Infinity
  for (const price of prices) {
    cost = Math.min(cost, price)
    profit = Math.max(profit, price - cost)
  }
  return profit
}

console.log('🧑', maxProfit2([7, 1, 5, 3, 6, 4]));