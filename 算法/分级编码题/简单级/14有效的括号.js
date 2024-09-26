function isCorrect(str) {
  const m = new Map();
  m.set("}", "{");
  m.set("]", "[");
  m.set(")", "(");

  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (m.has(str[i]) && m.get(str[i]) === stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(str[i]);
    }
  }
  return stack.length > 0 ? 0 : 1;
}


console.log(isCorrect("{[]}"));