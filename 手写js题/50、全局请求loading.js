/**
 * 比如一个页面中，或者多个组件中都需要请求并且展示loading状态，此时我们不想要每个页面或者组件都写一遍loading，那我们可以统一管理loading，loading有两种情况
● 1、全局只要有一个接口还在请求中，就展示loading
● 2、全局所有接口都不在请求中，就隐藏loading
 */

//测试
// 模拟请求
function request(delay) {
    return () => {
      return new Promise(resolve => {
        setTimeout(() => resolve('成功喽'), delay)
      })
    }
  }
  
  const manager = new PromiseManager()
  
  manager.push(request(1000), request(2000), request(800), request(2000), request(1500))
  
  const timer = setInterval(() => {
     // 轮询查看loading状态
     console.log(manager.loading)
  }, 300)