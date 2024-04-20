//自执行函数的实现
const SingleIntance1 = (() => {
    let instance = null

    class Cat{
        constructor(name) {
            this.name = name
        }
    }

    const getIntance = () => {
        if (instance) return instance
        instance = new Cat('🐱')
        return instance
    }
    return {
        getIntance
    }
})()


// obj的实现
const SingleIntance = {
    instance: null,
    Cat: class {
        constructor(name) {
            this.name = name
        }
    },
    getIntance: function() {
        if (this.instance) return this.instance
        this.instance = new this.Cat('🐱')
        return this.instance
    }
}


const instance1 = SingleIntance.getIntance()
const instance2 = SingleIntance.getIntance()
console.log(instance1, instance2, instance1 === instance2)