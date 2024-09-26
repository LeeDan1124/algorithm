/**
给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
括号只考虑 "(" 和 ")" ，有效的括号是指一系列左括号 "(" 和 ")" 组成；但是如果有一些额外的括号，使得括号不能正确配对，就需要删除。
删除规则：从前往后，且尽可能少的删除多余括号。 
 */
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (str) {
  const stack = [];
  const arr = str.split("");
  for (let i = 0; i < arr.length; i++) {
    if (!["(", ")"].includes(str[i])) {
      continue;
    }
    if (str[i] === "(") {
      stack.push({
        key: "(",
        index: i,
      });
    }
    if (str[i] === ")") {
      // 这里先不删，先记录，最后栈里没出栈的都是需要删掉的
      if (!stack.length || stack[stack.length - 1].key === ")") {
        stack.push({
          key: ")",
          index: i,
        });
      } else if (stack[stack.length - 1].key === "(") {
        // 遇到右括号就从栈顶开始比较匹配并出栈
        stack.pop();
      }
    }
  }

  // 栈中剩下的都是不匹配的括号,从后向前删除，不然索引值会乱
  for (let i = stack.length - 1; i >= 0; i--) {
    const { index } = stack[i];
    arr.splice(index, 1);
  }
  return arr.join("");
};
