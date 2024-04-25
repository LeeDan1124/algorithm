/**
 * ali笔试题
 * 解析文件大小为 byte 数字
 * @param str 文件大小的描述（带单位）
 * @returns number
 */
function parseBytes(str) {
  if (typeof str !== "string") {
    throw new Error("请输入字符串");
  }

  const byteMap = {
    "": 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  const reg = /^(\d*\.?\d*)\s*([KMGT](B|b))?$/;
  const match = reg.exec(str);

  if (!match || !match.length) {
    throw new Error("请输入正确的文件大小");
  }

  const num = +match[1];
  const unit = (match[2] ?? "").toUpperCase();
  //   console.log(num, unit);
  return num * byteMap[unit];
}

// test cases
console.log(parseBytes("123")); // 123
console.log(parseBytes("1.2 Kb")); // 1228.8
console.log(parseBytes("1.2 Mb")); // 12886411837.44
console.log(parseBytes("1.2 Gb"));
console.log(parseBytes("1.2 Tb"));
