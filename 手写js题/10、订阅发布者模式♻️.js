class Sub{
    constructor() {
        this.events = {}
        this.bookersCbs = {}
    }

    // 发布者告诉中介他们有什么信息
    addEvent(type, context) {
        this.events[type] = this.events[type] ? this.events[type] : []
        this.events[type].push(context)
    }

    // 收集订阅者，收到订阅消息后要干什么
    addBooker(type, callback) {
        this.bookersCbs[type] = this.bookersCbs[type] ? this.bookersCbs[type] : []
        this.bookersCbs[type].push(callback)
    }

    //中介发送消息
    sendMsg(type) {
        const contexts = this.events[type]
        const cbs = this.bookersCbs[type]

        if (!contexts || !cbs) {
            return new Error('当前类型的订阅里暂没有消息/没有订阅者')
        }

        cbs.forEach(cb => {
            try {
                cb(contexts)
            } catch(e) {
                console.log('报错了')
            }
        })
    }
}

class Publisher{
    constructor(sub) {
        this.sub = sub
    }

    publishType(type, context) {
        this.sub.addEvent(type, context)
    }
}

class Booker{
    constructor(name, sub) {
        this.name = name
        this.sub = sub
    }

    addBooker(type, cb) {
        this.sub.addBooker(type, cb)
    }
}

const sub = new Sub()

const booker1 = new Booker('章三', sub)
const booker2 = new Booker('里斯', sub)
const booker3 = new Booker('王武', sub)

const publisher1 = new Publisher(sub)
const publisher2 = new Publisher(sub)

publisher1.publishType('音乐', '我爱你中国')
publisher1.publishType('音乐', 'abcdefu')
publisher1.publishType('音乐', '玫瑰玫瑰')

publisher2.publishType('电影', '我是证人')
publisher2.publishType('电影', '重返20岁')

booker1.addBooker('音乐', (msgs) => {
    console.log(`${booker1.name}收到了音乐频道的消息${JSON.stringify(msgs)}`)
})
booker1.addBooker('电影', (msgs) => {
    console.log(`${booker1.name}收到了电影频道的消息${JSON.stringify(msgs)}`)
})
booker2.addBooker('电影', (msgs) => {
    console.log(`${booker2.name}收到了电影频道的消息${JSON.stringify(msgs)}`)
})

sub.sendMsg('电影')