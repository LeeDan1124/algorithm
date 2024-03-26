class HashRouter {
    constructor() {
        this.routers = {}    // 存放hash和对应的回调函数
        this.curURL = ''     // 存放当前页面的路由
        this.hashList = []   // 存放所有的hash路径
        this.curIndex        // 存放当前hash所在hashList的索引
        this.isBack = false  // 是否是回退操作
        this.isGo = false    // 是否是前进操作
        window.addEventListener('load', this.refresh, false)
        window.addEventListener('hashchange', this.refresh, false)
    }

    // 创建hash与回调
    route = (hash, callbak) => {
        this.routers[hash] = callbak || function(){}
    }

    refresh = (e) => {
        // load事件没有newURL属性
        if (e.newURL) {
            this.curURL = e.newURL.split('#')[1]
        } else {
            this.curURL = window.location.hash.slice(1)
        }
        this.routers[this.curURL] && this.routers[this.curURL]()

        // 如果不是回退&前进操作的话才压hash入栈，否则在回退的时候会执行load和hashchange事件，重复压hash路径入栈
        if (!this.isBack && !this.isGo) {
            // 将hash路径压入路径栈,并更新当前所在页面的hash索引值
            this.hashList.push(this.curURL)
            this.curIndex = this.hashList.length - 1
        }
    }

    // 实现回退功能
    back = (step = 1) => {
        this.isBack = true
        this.curIndex = this.curIndex <= step ? 0 : this.curIndex - step

        this.curURL = this.hashList[this.curIndex]
        window.location.hash = `#${this.curURL}`
        // this.routers[this.curURL]()  这里不需要执行回调，否则hash对应的回调会被执行两次，直接在refresh函数中执行回调即可
    }

    // 实现前进功能
    go = (step = 1) => {
        this.isGo = true
        this.curIndex = this.curIndex + step >= this.hashList.length - 1 ? this.hashList.length - 1 : this.curIndex + step

        this.curURL = this.hashList[this.curIndex]
        window.location.hash = `#${this.curURL}`
        // this.routers[this.curURL]()  // 和上面同理
    }

}