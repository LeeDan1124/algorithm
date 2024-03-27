/**
 * 使用 split 方法将 url 的 queryString 转成 object 返回，不可使用URL / URLSearchParams

当有相同参数时，合并成数组，如: a=1&a=2， 则 {a: ["1", "2"]}
 */
const getQuery = (url) => {
  const result = {};
   
  /**
   * 代码补全
   */
}
 
console.log(getQuery('https://domain'));                  //  {}
console.log(getQuery('https://domain?a=1&b=2&c='));       //  {a: "1", b: "2", c: ""}
console.log(getQuery('https://domain?a=1&b=2&c=3&c=4'));  //  {a: "1", b: "2", c: ["3", "4"]}
console.log(getQuery('domain?a=1&b=2&c=3??3='));          //  {a: "1", b: "2", c: "3??3="}