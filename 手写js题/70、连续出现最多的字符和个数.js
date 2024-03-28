// 找出字符串中连续出现最多的字符和个数，请实现以下函数
// http://conf.ctripcorp.com/pages/viewpage.action?pageId=499950743
// 方案一: 先收集次数再筛选
function findContinuouslyLongest (str) {
  // 补全代码
  let result = {};

  if (!str || typeof str !== 'string') return result

  let left = 0, right = 0

  while(right <= str.length) {
    if (str[right] === str[left]) {
      right++
    } else {
      result[str[left]] = result[str[left]] ? Math.max(result[str[left]], right - left) : right - left
      left = right
    }
  }

  const maxTimes = Object.values(result).reduce((pre, cur) => cur > pre ? cur : pre, -1)

  Object.keys(result).forEach(k => {
    if (result[k] !== maxTimes) {
      delete result[k]
    }
  })

  return result;
}





// 方案二：收集的时候同时筛选
function findContinuouslyLongest1 (str) {
  // 补全代码
  let result = {};

  if (!str || typeof str !== 'string') return result

  let left = 0, right = 0, maxTimes = 0

  while(right <= str.length) {

    if (str[right] === str[left]) {
      right++
    } else {

      curTimes = result[str[left]] ? Math.max(result[str[left]], right - left) : right - left
      
      if (curTimes === maxTimes) {
        result[str[left]] = curTimes
      }
      
      if (curTimes > maxTimes) {
        result = {
          [str[left]]: curTimes
        }
        maxTimes = curTimes
      }

      left = right
    }
  }

  return result;
}


// 调用
const test1 = 'abcaakjbb';
const test2 = 'abbkejsbcccwqaa';
const test3 = 'abcdef';

console.log(JSON.stringify(findContinuouslyLongest1(test1)));
console.log(JSON.stringify(findContinuouslyLongest1(test2)));
console.log(JSON.stringify(findContinuouslyLongest1(test3)));

// 正确结果
// {a: 2, b: 2}
// {c: 3}
// {a: 1, b: 1, c: 1, d: 1, e: 1, f: 1}






/*
评分重点：
1. 入参类型和空检查 [0 - 2]
2. 并列最大次数的字符实现 [0 - 3]
3. 代码规范与注释等其他 [0 - 5]
*/
 
function findLongest (str) {
  if (!str || typeof str !== 'string') return {};
  let obj = {},
      maxCount = 0, // 最大连续次数
      curCount = 1;  // 当前连续次数（默认最小连续次数为1）
  for (let i = 0; i < str.length; i++) {
      let curChar = str[i];
      // 如果连续
      if (curChar === str[i + 1]) {
          // 当前连续次数+1
          ++curCount;
          // 只要当前连续次数比之前的大，就直接覆盖obj
          if (maxCount < curCount) {
              maxCount = curCount;
              obj = { [curChar]: maxCount };
          }
          // 有可能若干字符连续次数相同，那么追加到obj
          if (maxCount === curCount) {
              obj[curChar] = maxCount;
          }
      } else {
      // 如果不连续
          curCount = 1; // 重置连续次数
      }
  }
  return obj;
}
