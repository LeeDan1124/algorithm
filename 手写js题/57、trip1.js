// 浏览器中实现函数 download，通过 XMLHttpRequest 获取远端 url 数据，并设置超时，HTTP 正确响应码为 200，回调结果为 ArrayBuffer 类型
// http://conf.ctripcorp.com/pages/viewpage.action?pageId=677085809
function download(url, timeout = Infinity, completeCallback) {
  // 补全代码
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