// 实现 compare(object1, object2) => bool 函数，对 object1 和 object2 做深度对比，
// 每一个键对应的值可能为 string、number、array (每一项的值受同等约束)、object (每一个键对应的值受同等约束)，
// 可能存在 object 或 array 递归引用，返回 true 或 false
let cache = new Map()

function compare(object1, object2) {
  // 补全代码

  // 1、类型不同
  if (typeof object1 !== typeof object2) return false

  // 2、基础类型
  if (
		(typeof object1 !== 'object' && typeof object2 !== 'object') || 
		(object1 === null || object2 === null)
	) return object1 === object2

	// 3、长度 或者 key值的数量不同
	if (Object.keys(object1).length !== Object.keys(object2).length) return false

	// 4、比较每一项
	let res = true
	for (let key in object1) {
		const value1 = object1[key]
		const value2 = object2[key]
		if (value2 === undefined) return false

		if (cache.has(value1) && cache.has(value2)) {
			return cache.get(value1) === cache.get(value2)
		}
		if ((cache.has(value1) && !cache.has(value2)) || (!cache.has(value1) && cache.has(value2))) {
			return false
		}
		
		cache.set(value1, value1)
		cache.set(value2, value2)
		res = compare(value1, value2)
		if (!res) return false
	}

	return res
}
 
let a = {}, b = {}, c = {}, d = {};
[a, b, c, d].forEach((item) => {
  item.key1 = 'value1';
  item.key2 = 2;
  item.key3 = [a, b, c, d];
  item.key4 = { a, b, c, d };
  item.a = a;
  item.b = b;
  item.c = d;
  item.d = c;
});
console.log('#1:', compare(a, b));
console.log('#2:', compare(c, d));
[c, d].forEach((item) => {
  let key = `e_${Math.random()}`;
  let subItem = {};
  subItem[key] = item;
  item.key3.push(subItem);
});
console.log('#3:', compare(a, b));
console.log('#4:', compare(c, d));
 
// const a = {
// 	a: 1,
// 	b: false,
// 	c: null,
// 	d: 'd',
// 	e: [1,2,3,4,5],
// 	f: {
// 		aa: 1,
// 		bb: false,
// 		cc: 'cc',
// 		dd: null,
// 		ee: {
// 			aaa: '啦啦啦'
// 		}
// 	}
// }

// const b = {
// 	a: 1,
// 	b: false,
// 	c: null,
// 	d: 'd',
// 	f: {
// 		aa: 1,
// 		bb: false,
// 		cc: 'cc',
// 		dd: null,
// 		ee: {
// 			aaa: '啦啦啦'
// 		}
// 	},
// 	e: [1,2,3,4,5],
// }
// console.log(compare(a, b))


/* 输出如下: */
/*
#1: true
#2: true
#3: true
#4: false
*/





/*
评分重点：
1. 优先判断恒等，恒等时跳过其他检查 [ 0-1 ]
2. 类型限制、一致性判断 [ 0-1 ]
3. object 允许 key 乱序，优先判断 key 一致性，提升性能 [ 0-1 ]
4. array 优先判断长度一致性，提升性能 [ 0-1 ]
5. 循环依赖和交叉依赖检查，通过二维 Map 解决 [ 0-2 ]
6. 递归处理 object 和 array [ 0-1 ]
7. 其他 [ 0-3 ]
*/
 
/*
function compare(object1, object2) {
  let refs = new Refs();
  return _compare(object1, object2, refs);
}
 
class Refs {
  constructor() {
    this._refs = new Map();
  }
  mark(a, b) {
    if (!this._refs.has(a)) {
      this._refs.set(a, new Map());
    }
    this._refs.get(a).set(b, true);
    if (!this._refs.has(b)) {
      this._refs.set(b, new Map());
    }
    this._refs.get(b).set(a, true);
  }
  hasMark(a, b) {
    return this._refs.has(a) && this._refs.get(a).has(b);
  }
}
 
const TYPES = ["string", "number", "object", "array"];
function getType(item) {
  let type = Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
  if (!TYPES.includes(type)) {
    throw new Error(`Invalid Type: ${type}`);
  }
  return type;
}
 
function _compare(object1, object2, refs) {
  if (object1 === object2) {
    return true;
  }
  let type1 = getType(object1);
  let type2 = getType(object2);
  if (type1 != type2) {
    return false;
  }
  switch (type1) {
    case 'object':
      if (refs.hasMark(object1, object2)) {
        return true;
      }
      let keys1 = Object.getOwnPropertyNames(object1).sort();
      let keys2 = Object.getOwnPropertyNames(object2).sort();
      if (compare(keys1, keys2)) {
        refs.mark(object1, object2);
        return keys1.every((key) => {
          if (key == 'key4') {
            let result = _compare(object1[key], object2[key], refs);
            return result;
          } else {
            return _compare(object1[key], object2[key], refs);
          }
        });
      }
      return false;
    case 'array':
      if (refs.hasMark(object1, object2)) {
        return true;
      }
      if (object1.length != object2.length) {
        return false;
      }
      refs.mark(object1, object2);
      return object1.every((value1, idx) => _compare(value1, object2[idx], refs));
    case 'string':
    case 'number':
      return object1 == object2;
  }
}
*/