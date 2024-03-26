/***
 * replace('原字符串', (匹配到的字符串, $1-$9, index) => {})
 * 注意这里的正则，需要用()括住\w+,让它成为一个捕获组
 */
function transTemplate(template, data) {
}

// 使用
let data = {
  name: "lidan",
  age: 27,
};
let template = "我叫{{name}},我今年{{age}}岁了";
console.log(transTemplate(template, data)); // 我叫lidan,我今年27岁了
