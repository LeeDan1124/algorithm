function zip(str) {
//   const reg = /(\w)\1+/g;
//   return str.replace(reg, (_, $1, $2) => $1);

  if (!str) return "";

  let left = 0; // 始终指向重复项的第一个
  let right = 1;

  const arr = str.split("");
  while (right <= arr.length - 1) {
    while (arr[right] === arr[left]) {
      arr.splice(right, 1);
    }
    left = right;
    right++;
  }
  return arr.join("");
}

// console.log("🧞‍♀️", zip("aabbbsssc"));



const a = ' {\n  backgroundColor: nasl.core.String;\n  color: nasl.core.String;\n}'
// 获取a中的键和对应的值
const reg = /([\w]+):\s*([^;]+)/g
// while(reg.lastIndex < a.trim().length) {
//   const b = reg.exec(a)
//   console.log('👯', b)
// }
console.log('🧤', a.match(reg))
