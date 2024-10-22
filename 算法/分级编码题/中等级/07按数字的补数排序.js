// 对整数的二进制表示取反（0 变 1 ，1 变 0）后，再转换为十进制表示，可以得到这个整数的补数。
// 例如，整数 5 的二进制表示是 "101" （没有前导零位），取反后得到 "010" ，再转回十进制表示得到补数 2 。
// 给你一个整数数组 arr 。请你将数组中的元素按照其补数升序排序。如果补数相同，则按照原数值大小升序排列。
// 请你返回排序后的数组。

// 5,10,4,2

// 5 -> 101 -> 010 -> 2
// 10 -> 1010 -> 0101 -> 5
// 4 -> 100 -> 011 -> 3
// 2 -> 10 -> 01 -> 1

// 2 5 4 10
function getSortNums(nums) {
  function transfer(n) {
    const erjinzhi = n.toString(2);
    const erLen = erjinzhi.split("").length;
    const one = `0b${"".padEnd(erLen, 1)}`;
    // 注意点 1：要在数字前加 0b 表示二进制才能正确的异或操作，相同为0，不同为 1
    return `0b${erjinzhi}` ^ one;
  }

  return nums
    .sort((a, b) => {
      const transA = transfer(a);
      const transB = transfer(b);
      return transA === transB ? a - b : transA - transB;
    })
    .join(",");
}
