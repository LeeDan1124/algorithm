const once = (func) => {
  if (typeof func !== "function") {
    return Error("请输入一个函数");
  }

  const cache = new Map();
  return (...args) => {
    if (cache.has(func)) {
      return;
    }
    cache.set(func, true);
    return func(...args);
  };
};

const runOnce1 = once(function (s) {
  console.log(s, "我只执行第一次");
});
runOnce1("lidan"); // 这次输出‘我只执行第一次’
runOnce1(); // 这次不会输出

const runOnce2 = once(function () {
  console.log("我只执行第一次=====");
});
runOnce2(); // 这次输出‘我只执行第一次’
runOnce2(); // 这次不会输出
