function flatten(obj) {
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { 
        e: {q: 6}
    },
    f: function(){}
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
