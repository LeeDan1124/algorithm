class Target{
    constructor(target) {
        this.target = target
        this.observers = []
    }

    addObserver(observer) {
        this.observers.push(observer)
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(o => o.name !== observer.name)
    }

    sendMsg(msg) {
        this.observers.forEach(observer => {
            try {
                observer.getMsg(msg)
            } catch(e) {
                console.log('错误了')
            }
        })
    }
}

class Observer{
    constructor(name) {
        this.name = name
    }

    getMsg(msg) {
        console.log(`${this.name}收到消息，内容是${msg}`)
    }
}

const target = new Target('章三')
const observer1 = new Observer('要债1')
const observer2 = new Observer('要债2')
const observer3 = new Observer('要债3')

target.addObserver(observer1)
target.addObserver(observer2)
target.removeObserver(observer1)
target.addObserver(observer3)

target.sendMsg('还钱了')