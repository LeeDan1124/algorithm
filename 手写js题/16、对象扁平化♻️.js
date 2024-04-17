function flatten(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    return Error("请输入一个对象");
  }

  const res = {};

  const inner = (val, parentKey) => {
    const keys = Object.keys(val);

    for (let i = 0; i <= keys.length - 1; i++) {
      const _key = keys[i];
      const _val = val[keys[i]];

      const curKey = !!parentKey
        ? Array.isArray(val)
          ? `${parentKey}[${_key}]`
          : `${parentKey}.${_key}`
        : _key;

      if (typeof _val !== "object" || _val === null) {
        res[curKey] = _val;
      } else {
        inner(_val, curKey);
      }
    }
  };
  inner(obj, "");

  return res;
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: { q: 6 },
    },
    f: function () {},
  },
  b: [11, 22, { g: 33, h: [44, 55] }],
  c: 3,
};

console.log(flatten(obj));
// { 'a.b': 1,
//   'a.c': 2,
//   'a.d.e.q': 6,
//   'a.f': [Function: f],
//   'b[0]': 11,
//   'b[1]': 22,
//   'b[2].g': 33,
//   'b[2].h[0]': 44,
//   'b[2].h[1]': 55,
//   c: 3 }
