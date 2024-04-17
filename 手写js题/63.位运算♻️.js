/**
 * 在计算机的二进制存储中，正数是正常存储，负数是补码存储，现在给定一个整数 n，求 n 在二进制存储中 1 的个数
 */
function numOf1(n) {
  // 补全代码
}

console.log("Test Case 1:", numOf1(-1));
console.log("Test Case 2:", numOf1(0));

/* 输出如下: */
/*
Test Case 1: 32
Test Case 2: 0
*/

/**
评分重点：
1.二进制表示法 [0-3]
2.位运算 [0-4]
3.结果正确 [0-3]
*/
function numOf1(n) {
  let num = 0;
  while (n != 0) {
    ++num;
    n = n & (n - 1);
  }
  return num;
}
