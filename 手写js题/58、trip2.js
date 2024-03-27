// 实现 compare(object1, object2) => bool 函数，对 object1 和 object2 做深度对比，每一个键对应的值可能为 string、number、array (每一项的值受同等约束)、object (每一个键对应的值受同等约束)，可能存在 object 或 array 递归引用，返回 true 或 false

function compare(object1, object2) {
  // 补全代码
}
 
let a = {}, b = {}, c = {}, d = {};
[a, b, c, d].forEach((item) => {
  item.key1 = 'value1';
  item.key2 = 2;
  item.key3 = [a, b, c, d];
  item.key4 = { a, b, c, d };
  item.a = a;
  item.b = b;
  item.c = d;
  item.d = c;
});
console.log('#1:', compare(a, b));
console.log('#2:', compare(c, d));
[c, d].forEach((item) => {
  let key = `e_${Math.random()}`;
  let subItem = {};
  subItem[key] = item;
  item.key3.push(subItem);
});
console.log('#3:', compare(a, b));
console.log('#4:', compare(c, d));
 
/* 输出如下: */
/*
#1: true
#2: true
#3: true
#4: false
*/