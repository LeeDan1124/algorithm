// 将object转换为可迭代对象
// 方案一：在原型上添加[Symbol.itrator]属性，该属性是个函数，且返回一个对象，对象里有next函数
Object.prototype[Symbol.iterator] = function() {
  const keys = Object.keys(this)
  const res = {
    done: false,
    value: undefined,
    key: undefined
  }
  let index = 0

  const next = () => {
    if (index < keys.length) {
      res.done = false
      res.value = this[keys[index]]
      res.key = keys[index]
      index++
      return res
    } else {
      return {
        done: true,
        value: undefined,
        key: undefined
      }
    }
  }

  return {
    next
  }
}

// 方案二：将Object继承Array[因为Array是可迭代对象]
class Obj extends Array{}
const obj1 = new Obj({
  a: 1,
  b: 2,
  c: 3
})

const obj = {
  a: 1,
  b: 2,
  c: 3
}

const objIterator = obj[Symbol.iterator]() // 迭代器
console.log(objIterator.next())
console.log(objIterator.next())
obj.c = 5
console.log(objIterator.next())
console.log(objIterator.next())
console.log(objIterator.next())

for (let item of obj) {
  console.log(item, '===item')
  if (item === 2) {
    break
  }
}