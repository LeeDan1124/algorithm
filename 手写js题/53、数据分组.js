const personInfo = [
  {name: 'zhangsan', age: 19, area: '无锡'},
  {name: 'lisi', age: 20, area: '陕西'},
  {name: 'wangwu', age: 20, area: '河南'},
  {name: 'zhaoliu', age: 22, area: '无锡'},
  {name: 'caojiu', age: 22, area: '无锡'},
  {name: 'yangqi', age: 22, area: '河南'},
  {name: 'jiangba', age: 20, area: '无锡'},
]


// 按某一些属性的值分类，按什么分类呢，传一个函数，你告诉我
const sortBy = (arr, sortFunc) => {

  const result = {}

  arr.forEach(person => {
    const keyValue = sortFunc(person)
    if (!!result[keyValue]) {
      result[keyValue].push(person)
    } else {
      result[keyValue] = [person]
    }
  })

  return result
}


console.log(sortBy(personInfo, person => person.age))
console.log(sortBy(personInfo, person => person.area))
console.log(sortBy(personInfo, person => `${person.area}-${person.age}`))
