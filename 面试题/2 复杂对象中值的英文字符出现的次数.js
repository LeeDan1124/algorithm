/**
 * ## 问题2
 * 统计一个复杂对象中值的英文字符 a-z以及A-Z个数，
 * 输入：
 * {
 *  name: 'code',
 *  obj: {
 *      name: 'CODE',
 *      age: [12, 45, 20],
 *      info: {
 *          nick: 'haha!'
 *      }
 *  },
 *  hooby: ['a', 'B']
 * }
 * 输出：14
 */
function calcCountOfObject(obj) {
  // coding...
  let num = 0;

  const getNum = (val) => {
    if (typeof val !== "string") {
      return 0;
    }
    return val.split("").reduce((pre, cur) => {
      const reg = /[a-zA-Z]/g;
      return reg.test(cur) ? pre + 1 : pre;
    }, 0);
  };

  const inner = (obj) => {
    const values = Object.values(obj);

    values.forEach((val) => {
      if (typeof val !== "object" || val === null) {
        const _s = getNum(val);
        num = num + _s;
      } else {
        inner(val);
      }
    });
  };

  inner(obj);

  return num;
}

const obj = {
  name: "code",
  obj: {
    name: "CODE",
    age: [12, 45, 20],
    info: {
      nick: "haha!",
    },
  },
  hooby: ["a", "B"],
};

console.log(calcCountOfObject(obj));
