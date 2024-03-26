var o = (function() {
    var obj = {
        a: 1,
        b: 2
    }
    return {
        get: function (key) {
            return obj[key]
        }
    }
})()


// 给Object的原型上加一个属性，这个属性返回了对象实例
Object.defineProperty(Object.prototype, 'changeObj', {
    get() {
        return this
    }
})
// o.get(key)会去获取obj的属性，当obj实例上没有changeObj属性时，就会去obj的原型上去找
// 而我在原型上已经加了一个方法，这个方法返回的就是实例自己，这样就可以获取到obj，拿到obj就能对他进行修改了
const _obj = o.get('changeObj')
_obj.a = '你被我改掉了，哈哈哈哈'
console.log(_obj) // { a: '你被我改掉了，哈哈哈哈', b: 2 }
console.log(o.get('changeObj')) // { a: '你被我改掉了，哈哈哈哈', b: 2 }


// 为了避免被更改，有以下几种方法
// 方法1:


// 方法2:
