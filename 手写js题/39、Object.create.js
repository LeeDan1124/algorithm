/**
 * Object.create是原型式继承的精髓
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 * 语法：Object.create(proto，[propertiesObject])
 * proto: 原型
 * propertiesObject: 实例的自有属性
 */

_create = (obj, propertiesObject={}) => {

}

var person = {
	age:18,
	friend:['gray','amili','adward']
}
var instance1 = _create(person, {sex:"male"})
var instance2 = _create(person)
console.log(instance1) //{ sex: 'male' }
console.log(instance2) //{}

console.log(instance1.friend) //[ 'gray', 'amili', 'adward' ]
console.log(instance2.age) //18
