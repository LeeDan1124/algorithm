const weights = [2, 5, 1, 4, 3];
const values = [5, 10, 3, 6, 3];
const totalWeight = 6;

// const totalBagValue = (totalWeight, values, weights) => {};
// console.log(totalBagValue(totalWeight, values, weights)); // 13


// 只能整体装物品，不可以拆分物品
function getBiggestPrice(n, C, Weights, Prices) {
  const matrix = [];

  for (let curObj = 0; curObj < n; curObj++) {
    matrix[curObj] = [];
    for (let curMaxWeight = 0; curMaxWeight <= C; curMaxWeight++) {
      const curWeight = Weights[curObj];
      const curPrice = Prices[curObj];

      if (curObj === 0) {
        matrix[curObj][curMaxWeight] = curWeight <= curMaxWeight ? curPrice : 0;
      } else {
        // 放下当前物品时的价值
        let p = 0;
        if (curWeight <= curMaxWeight) {
          // 当前物品的价值
          const p1 = curPrice;
          // 还可以装的其余物品的价值
          const otherWeight = curMaxWeight - curWeight;
          const p2 = matrix[curObj - 1][otherWeight] || 0;
          p = p1 + p2;
        }

        matrix[curObj][curMaxWeight] = Math.max(
          // 放下当前物品时的价值
          p,
          // 不放当前物品时的价值
          matrix[curObj - 1][curMaxWeight]
        );
      }
    }
  }

  return matrix[n - 1][C];
}

console.log(getBiggestPrice(3, 50, [10,20,30], [60,100,120])); // 220