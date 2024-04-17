/**
 * 用户打开APP时需要根据网络状态提示/展示不同的数据。
 * 网络状态主要分为三类：无网络状态/办公网络/外部网络。请设计并编写网络状态检测模块
    已知
    仅办公网络可访问http://xxx.intranet.trip.com/index.html
    外部网络可访问http://xxx.extranet.trip.com/index.html

    可以看文件夹64、网络状态检测模块
    主要的逻辑为，先优先请求内网支持的接口，如果请求不通的话，请求外网支持的接口，最后外网接口也调用不通时，最后返回网络不可用的状态
 */
// HTTP模块使用样例
const http = require("http");
const url = "http://m.ctrip.com/html5/";

http
  .get(url, (res) => {
    const { statusCode } = res;

    let error;

    if (statusCode !== 200) {
      error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    }

    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    const rawData = [];
    res.on("data", (chunk) => {
      rawData.push(chunk);
    });
    res.on("end", () => {
      try {
        const parsedData = Buffer.concat(rawData).toString();
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });
