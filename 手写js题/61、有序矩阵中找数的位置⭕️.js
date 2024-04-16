/**
 * 二维数组中的查找，在一个二维数组array中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。请实现函数,输入这样的一个二维数组和一个整数，输出该整数的位置,未找到输出-1;
 * (注意: 须考虑大数据量时的性能)
 */
function find(target, array) {
  // 补全代码
  let hang = 0;
  let lie = array[0].length - 1;

  while (hang <= array.length && lie >= 0) {
    if (target > array[hang][lie]) {
      hang++;
    } else if (target < array[hang][lie]) {
      lie--;
    } else {
      return [hang, lie];
    }
  }
  return -1;
}

let arr = [
  [1, 2, 3, 7],
  [5, 6, 9, 12],
  [6, 7, 10, 15],
];

console.log("Test Case 1:", find(3, arr));
console.log("Test Case 2:", find(4, arr));

/* 输出如下: */
/*
Test Case 1: [0, 2]
Test Case 2: -1
*/
