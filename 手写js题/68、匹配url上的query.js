/**
 * 使用 split 方法将 url 的 queryString 转成 object 返回，不可使用URL / URLSearchParams
 * 当有相同参数时，合并成数组，如: a=1&a=2， 则 {a: ["1", "2"]}
 */
const getQuery = (url) => {
  const result = {};
   
  /**
   * 代码补全
   */
  if (!url) return result

  const reg = /[^?]+\?(.+)/g
  const queries = reg.exec(url)

  if (!queries) return result

 
  // 注意注意注意：这里是一整个捕获组的正则，而不是所有字符串的正则，所以不能加后面的+！！！！！ 🙅const regPart = /(([^&=]+)=([^&]*)&?)+/g
  const regPart = /([^&=]+)=([^&]*)&?/g

  // 方案一：exec法-----reg.lastIndex需要正则有g标识，否则每次的lastIndex不变  lastIndex是正则的方法
  while (regPart.lastIndex < queries[1].length - 1) {
    const parts = regPart.exec(queries[1])
    const key = parts[1]
    const value = parts[2]
    result[key] = value
  }

  // 方案二：replace法
  // queries[1].replace(regPart, ($0, $1, $2) => {
  //   result[$1] = result[$1] ? Array.isArray(result[$1]) ? [...result[$1], $2] : [result[$1], $2] : $2
  // })

  return result
}
 
console.log(getQuery('https://domain'));                  //  {}
console.log(getQuery('https://domain?a=1&b=2&c='));       //  {a: "1", b: "2", c: ""}
console.log(getQuery('https://domain?a=1&b=2&c=3&c=4'));  //  {a: "1", b: "2", c: ["3", "4"]}
console.log(getQuery('domain?a=1&b=2&c=3??3='));          //  {a: "1", b: "2", c: "3??3="}









/*
评分重点：
1. 入参类型检查 [0 - 1]
3. query字符串截断处理逻辑，不能使用split('?')[1] [0 - 2]
2. 相同参数是否合并 [0 - 2]
3. 特殊符号处理逻辑，比如key=value=，{key: "value="} [0 - 2]
3. 代码规范与注释等其他 [0 - 3]
*/
const getQuery1 = (url) => {
  const result = {};
 
  // 入参判断是否为字符串
  if (typeof url !== 'string') {
    return result;
  }
 
  const index = url.indexOf('?');
  if (index === -1) {
    return result;
  }
 
  const query = url.substr(index + 1);  // 不能用split('?')[1]来截断，因为参数里可能会带"?"
  strs = query.split("&");
  strs.forEach((item) => {
    const arr = item.split('=');
    const key = arr.shift();
    const value = arr.join('=');  // 值中可能带 "="
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });
 
  return result;
}



// let t = 'cat, bat, sat, fat'
// let p = /.at/g
// while(p.lastIndex < t.length - 1) {
//   console.log(p.exec(t),'==exec==')
// }