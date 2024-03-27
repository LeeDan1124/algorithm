/**
 * ReactJs或Vue大型应用，常见跨组件（非父子组件场景）通信。请简单实现一个事件总线类MessageCenter
实现subcribe注册函数，unsubscribe移除函数，publish发布则触发顺序执行
 */
/*
 * ReactJs或Vue大型应用，常见跨组件（非父子组件场景）通信。请简单实现一个事件总线类MessageCenter
 * 实现subcribe注册函数，unsubscribe移除函数，publish发布则触发顺序执行
 */
const MessageCenter = {
  // 补全代码实现
  subscribe: function() {},
  unsubscribe: function() {},
  publish: function() {}
}

/* 场景案例 1 */
let listener1 = MessageCenter.subscribe('event', (data) => {
  console.log('event listener1 run', data);
})
let listener2 = MessageCenter.subscribe('event', (data) => {
  console.log('event listener2 run', data);
})

MessageCenter.publish('event', 'AAA');

// 正确输出
// event listener1 run AAA
// event listener2 run AAA

/* 场景案例 2 */
let listener3 = MessageCenter.subscribe('event', (data) => {
  console.log('event listener3 run', data);
});
let listener4 = MessageCenter.subscribe('event', (data) => {
  console.log('event listener4 run', data);
});

MessageCenter.unsubscribe('event', listener3);
MessageCenter.publish('event', 'BBB');

// 正确输出
// event listener4 run BBB