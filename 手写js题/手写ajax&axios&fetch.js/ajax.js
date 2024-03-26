function _Ajax(options) {
    // 解构options
    let {
        method='get', 
        url='', 
        params=null, 
        requestHeader={}, 
        timeout=null, 
        successCB=()=>{}, 
        errorCB=()=>{}
    } = options

    // 将{a: 1, b: 2}转换为a=1&b=2格式
    function _transParams(params) {
        let keys = Object.keys(params)
        return keys.reduce((pre, cur, index) => {
            const flag = index === keys.length - 1 ? '' : '&'
            // get请求的value值需要用encodeURICompoment()方法进行编码
            const value = encodeURIComponent(params[cur])
            return `${pre}${cur}=${value}${flag}`
        }, '')
    }

    // 如果传入timeout说明在该时间结束后要中断请求
    let timer = null
    if (timeout) { 
        timer = setTimeout(() => {
            xhr.abort()
            clearTimeout(timer)
        }, timeout)
    }

    let xhr = null
    try {
        xhr = new XMLHttpRequest()
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }

    if (/^(get|head|option|delete)$/i.test(method)) {  // 需要将params接在url后面
        xhr.open(method, `${url}?${_transParams(params)}${new Date().getTime()}`, true)
    } else {    // 将data以请求体的形式发送
        xhr.open(method, `${url}`, true)
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
            // 此处的try-catch是为了捕获请求超时，请求超时时readyState还是会变成4，但是status会报错
            try {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    // 响应成功后可回调,且将timeout设置的定时器取消掉
                    timer && clearTimeout(timer)
                    successCB.call(this, xhr)
                }
            } catch(e) {
                // 响应失败的回调
                errorCB.call(this, xhr)
            }
        }
    }

    // 发送额外的请求头，请求头需要一个一个设置  是set set set! 不是send！
    Object.keys(requestHeader).length && Object.keys(requestHeader).forEach(item => {
        xhr.setRequestHeader(item, requestHeader[item])
    })

    // post类请求需要发送Content-type: application/x-www-form-urlencoded
    if (/^(post|put)$/i.test(method)) {  
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    }

    // 此处的data初始值是null,如果是get类的请求，可以直接send(null),如果是post类的请求，send(params)
    xhr.send(_transParams(params))
}

// 使用
_Ajax({
    method: 'get',
    url: 'http://localhost:1124/getInfo',
    params: {name: 'lidan', age: 27},
    // 由于设置简单请求以外的请求头，所以此次请求会先发送一次预检请求
    requestHeader: {'x-csrf-token': 'llldddaaannn'},
    timeout: 3000,
    successCB: (xhr) => {
        console.log(xhr, '======')
    },
    errorCB: (errXHR) => {}
})

