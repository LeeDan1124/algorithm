/**
 * 假设现在有一堆硬币，其中有足够个1元硬币、足够个2元硬币和足够个5元硬币。
 * 现在需要用这些硬币凑出总价值为n元的钱，求最少需要多少枚硬币？
 */


// 方案一（一维数组存储即可）：
function getMinCoins2(coins, amount) {
    // 因为最小的硬币是 1块，即使全部用 1 块的凑金额，最多也就 amount 个，如果最后 dp 里的数据还是 amount+1，说明凑不出这么多金额
    const dp = new Array(amount + 1).fill(amount + 1) 
  
    dp[0] = 0
    for (let curAmount = 1; curAmount <= amount; curAmount++) {
      for (let c = 0; c < coins.length; c++) {
        const curCoin = coins[c]
        // 子问题无解
        if (curAmount - curCoin < 0) {
           continue
        }
        dp[curAmount] = Math.min(dp[curAmount], dp[curAmount - curCoin] + 1)
      }
    }
  
    return dp[amount] === amount + 1 ? -1 : dp[amount]
  }
  

  // 方案二（背包问题解法，有点复杂，需要二维数据存储）：
// function getMinCoins1(amount) {
//   if (amount <= 0) return 0
  
//   const coins = [1, 2, 5]
//   const dp = new Array(coins.length).fill(null).map(i => new Array(amount+1).fill(amount+1))

//   for (let c = 0; c < coins.length; c++) {
//     for (let curMaxAmount = 0; curMaxAmount <= amount; curMaxAmount++) {
//       if (c === 0) {
//         dp[c][curMaxAmount] = curMaxAmount === 0 ? 0 : curMaxAmount
//         continue
//       }

//       const curCoin = coins[c]
//       // 方案一：选用当前硬币所需要的硬币数
//       // 可以用当前硬币多少个
//       const curCoinNum = parseInt(curMaxAmount / curCoin) 
//       // 当前面额的硬币最多能凑多少钱
//       const curAmount = curCoinNum * curCoin
//       // 还剩余多少钱需要补
//       const curUnenoughAmount = curMaxAmount - curAmount
//       // 还需要补几个硬币
//       const unenoughCoinNum = curUnenoughAmount >= 0 ? dp[c-1][curUnenoughAmount] : 0
//       const coinsSelected = curCoinNum + unenoughCoinNum
      
//       // 方案二：不选当前硬币所需要的硬币数
//       const coinsUnSelect = dp[c-1][curMaxAmount]

//       dp[c][curMaxAmount] = Math.min(coinsSelected, coinsUnSelect)
//     }
//   }

//   return dp[coins.length - 1][amount]
// }