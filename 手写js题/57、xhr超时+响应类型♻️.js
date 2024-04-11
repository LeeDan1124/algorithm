// 浏览器中实现函数 download，通过 XMLHttpRequest 获取远端 url 数据，并设置超时，HTTP 正确响应码为 200，回调结果为 ArrayBuffer 类型
// http://conf.ctripcorp.com/pages/viewpage.action?pageId=677085809

function download(url, timeout = Infinity, completeCallback) {
  // 补全代码
  if (!url) {
    throw Error('请输入下载地址')
  }

  let xhr
  try {
    xhr = new XMLHttpRequest()
  } catch(e) {
    xhr = ActiveXObject('Microsoft.XMLHTTP')
  }

  // 1、设置超时时间，并设置超时回调
  xhr.timeout = timeout
  xhr.ontimeout = (e) => {
    completeCallback && completeCallback(e)
    return e
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      try {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          completeCallback && completeCallback(null, xhr.response)
          // return xhr.response
        }
      } catch(e) {
        completeCallback && completeCallback(e)
      }
    }
  }

  xhr.open('get', url, true)

  // 2、设置相应类型为arraybuffer
  xhr.responseType = 'arraybuffer'
  
  xhr.send(null)
}

download(
  "http://foo.bar", // 下载地址
  500, // 超时
  function (err, result) { // 下载完成回调
      if (err) {
          console.error(err.message);
      } else {
          console.log('RESULT:', result);
      }
  }
);

/* 成功下载输出如下: */
/*
RESULT: ArrayBuffer(5242880)
*/

/* 超时输出如下: */
/*
XHR Timeout
*/

/* 错误输出如下: */
/*
Network Error
*/