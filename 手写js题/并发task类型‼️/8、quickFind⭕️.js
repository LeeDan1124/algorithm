/**
 * 给一个hosts的数组，一个ping方法，ping方法可以在这个host成功时返回这个host字符串，失败时返回异常，
 * 实现一个quickFind方法，找到最快的host
 */
const ping = (host) => {
  return new Promise((resolve, reject) => {
    const n = Math.random() * 5;
    console.log(n, host, "🍊");
    setTimeout(() => {
      if (n >= 4) {
        resolve(host);
      } else {
        reject(host);
      }
    }, n * 1000);
  });
};

const quickFind = (hosts) => {
  const taskList = hosts.map((host) => () => ping(host));

  return new Promise(async (resolve, reject) => {
    const err = [];
    for (let i = 0; i < taskList.length; i++) {
      const res = await taskList[i]().catch((e) => {
        err.push(e);
      });

      if (res) {
        resolve(res);
        break;
      }
    }
    reject(err);
  });
};

const hosts = ["10.233.211.222", "20.233.211.333", "30.233.211.444"];
quickFind(hosts)
  .then((val) => console.log(val, "找到了"))
  .catch((e) => {
    console.log(e, "没找到");
  });
