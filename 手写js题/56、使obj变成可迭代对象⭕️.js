// 将object转换为可迭代对象
// 方案一：在原型上添加[Symbol.itrator]属性，该属性是个函数，且返回一个对象，对象里有next函数
Object.prototype[Symbol.iterator] = function () {
  const keys = Object.keys(this);
  let curIndex = -1;
  return {
    next: () => {
      curIndex++;
      return {
        value: this[keys[curIndex]],
        key: keys[curIndex],
        done: curIndex >= keys.length ? true : false,
      };
    },
  };
};

// 方案二：将Object继承Array[因为Array是可迭代对象]
class Obj extends Array {}
const obj1 = new Obj({
  a: 1,
  b: 2,
  c: 3,
});

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

const objIterator = obj[Symbol.iterator](); // 迭代器
console.log(objIterator.next());
console.log(objIterator.next());
obj.c = 5;
console.log(objIterator.next());
console.log(objIterator.next());
console.log(objIterator.next());

for (let item of obj) {
  console.log(item, "===item");
  if (item === 2) {
    break;
  }
}
