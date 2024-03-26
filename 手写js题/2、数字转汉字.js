// 将123456 ---> 十二万三千四百五十六 考虑到亿

// 1 2305 6089 0123

//   2千3百0五  6千08十9
// 0 9870 0001 6780

const numberMap = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const unitMap = ["", "十", "百", "千"];
const bigUnitMap = ["", "万", "亿", "兆"];

function tranThousandNum(number) {
  return number
    .split("")
    .reverse()
    .reduce((pre, cur, index) => {
      const chinese = numberMap[cur];
      const curUnit = unitMap[index];

      const trans = `${chinese}${curUnit}`;
      pre = trans + pre;
      return pre;
    }, "");
}

function transNumberToChinese(number) {
  const numberStr = number + "";
  const numberList = [];

  // 1、数字分割
  for (let i = numberStr.length - 1; i >= 0; i--) {
    const start = Math.max(i - 3, 0);
    const end = i + 1;
    const curStr = numberStr.substring(start, end);
    numberList.push(curStr);
    i = start;
  }

  // 2、以千为单位进行转换，然后再为其添加 万、亿等单位
  const trans = numberList
    .reduce((pre, cur, index) => {
      const curUnit = bigUnitMap[index];
      pre = `${tranThousandNum(cur)}${curUnit}` + pre;
      return pre;
    }, "")
    .replace(/零(千|百|十)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零万/g, "万")
    .replace(/零亿/g, "亿")
    .replace(/亿万/g, "亿")
    .replace(/零+$/g, "");

    return trans
}
transNumberToChinese(987425310);
// transNumberToChinese(102301002001)
// const reg = /^([0-9]{1,4})([0-9]{4})*/
// console.log(reg.test(''))
