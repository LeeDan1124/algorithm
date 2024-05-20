/**
 * ## 问题1
 * 解析url中的queryString
 *
 * 输入：
 * "https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D";
 * 输出：
 * {
 *  name: "coder",
 *  age: "20",
 *  callback: "https://youzan.com?name=test",
 *  list: ["a", "b"],
 *  json: {
 *      str: 'abc',
 *      num: 123
 *  }
 * }
 */
function parseQuery(url) {
  // coding...
  const queryMap = {};
  const urlArr = url.split("?");
  const query = urlArr[1];

  const queryReg = /([^=]+)=([^&]+)&?/g;

  while (queryReg.lastIndex < query.length) {
    const match = queryReg.exec(query);
    const key = decodeURIComponent(match[1]);
    const val = decodeURIComponent(match[2]);

    const arrKeyReg = /(.+)\[\]/g;
    const keyExec = arrKeyReg.exec(key);

    if (keyExec) {
      if (queryMap[keyExec[1]]) {
        queryMap[keyExec[1]].push(val);
      } else {
        queryMap[keyExec[1]] = [val];
      }
    } else {
      queryMap[key] = val;
    }
  }

  return queryMap;
}
const url =
  "https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D";
console.log(parseQuery(url));
