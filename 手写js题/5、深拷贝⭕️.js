// ✅
// const cache = new Map();
// cache可以通过参数的方式传递，并复用
function deepClone(value, cache = new Map()) {
  if (typeof value !== "object" || value === null) return value;

  let res = Array.isArray(value) ? [] : {};
  Object.keys(value).forEach((key) => {
    const val = value[key];
    if (cache.has(val)) {
      res[key] = cache.get(val);
    } else {
      cache.set(val, val);
      if (val instanceof Set) {
        // console.log(val, new Set([...val]),'--🍊')
        res[key] = new Set([...val]);
      } else if (val instanceof Map) {
        // console.log(val, new Map([...val]),'--🍉')
        res[key] = new Map([...val]);
      } else {
        res[key] = deepClone(value[key], cache);
      }
    }
  });

  return res;
}

const val = {
  a: "1",
  b: null,
  c: [1, 2, [12, { c1: "2" }]],
  d: {
    d1: "1",
    d2: {
      d21: 1,
      d22: 2,
    },
  },
  [Symbol.s]: "kkk",
  f: new Set([1, 2, 3]),
  g: new Map([[1, 2]]),
};
val.e = val;

const a = deepClone(val);
const b = a;

// console.log(JSON.stringify(deepClone(val)),JSON.stringify(val), '---')
