class HistoryRouter {
    constructor() {
        this.routers = {}
        window.addEventListener('popstate', this.popStateChange, false)
        
    }

    // 将history和对应的回调存在对象中
    route = (history, callbak) => {
        this.routers[history] = callbak || function() {}
    }

    init = (path) => {
        window.history.replaceState({path: path}, null, path )
        this.routers[path] && this.routers[path]()
    }

    popStateChange = (e) => {
        console.log(e,'-----')
        const path = e
    }
}