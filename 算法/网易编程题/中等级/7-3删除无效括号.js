/**
给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
括号只考虑 "(" 和 ")" ，有效的括号是指一系列左括号 "(" 和 ")" 组成；但是如果有一些额外的括号，使得括号不能正确配对，就需要删除。
删除规则：从前往后，且尽可能少的删除多余括号。 
 */

// 解法一:
// 时间复杂度:O(n)
// 空间复杂度:O(n)
// 从前往后遍历字符串，用 count 记录左括号数量，遇到左括号 count++，遇到右括号 count--，如果 count < 0，说明右括号多余，删除该右括号，同时 count++，保证删除的是从前往后的多余右括号，最后删除前 count 个字符即可。
function getCorrectStr(str) {
  let count = 0; // 记录左括号数量
  const arr = str.split(""); // 将字符串转为数组
  for (let i = 0; i < arr.length; i++) {
    if (/^[a-zA-Z]+$/g.test(arr[i])) { // 如果是字母，跳过
      continue;
    }
    if (arr[i] === "(") { // 如果是左括号，count++
      count++;
    }
    if (arr[i] === ")") { // 如果是右括号
      if (count > 0) { // 如果有左括号可以匹配
        count--; // count--
      } else { // 如果没有左括号可以匹配
        arr.splice(i, 1); // 删除该右括号
        i--; // i--
        count++; // count++
    }
  }
  }
  return arr.splice(0, count).join(""); // 删除前 count 个字符
}


// function getCorrectStr(str) {
//   const m = new Map();
//   const arr = str.split("");
//   for (let i = 0; i < arr.length; i++) {
//     if (/^[a-zA-Z]+$/g.test(arr[i])) {
//       continue;
//     }
//     if (arr[i] === "(") {
//       m.set(arr[i], i);
//     }
//     if (arr[i] === ")" && m.has("(")) {
//       m.delete("(");
//     }
//     if (arr[i] === ")" && !m.has("(")) {
//       arr.splice(i, 1);
//       i--;
//     }
//   }

//   return m.has("(") ? arr.splice(m.get("("), 1).join("") : arr.join("");
// }

console.log(getCorrectStr("((a))())()"));
