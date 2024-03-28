/*
 * ReactJs或Vue大型应用，常见跨组件（非父子组件场景）通信。请简单实现一个事件总线类MessageCenter
 * 实现subcribe注册函数，unsubscribe移除函数，publish发布则触发顺序执行
 */
const MessageCenter = {

  eventList: {},
  // eventList: {
  //   'event': {
  //     'uuid1': cb,
  //     'uuid2': cb,
  //   }
  // },

  // 补全代码实现
  subscribe: function(eventName, callback) {

    // 为subscribe生成一个唯一的key值，但是，这种存储在对象里会因为对象的无序性导致cb不是按照顺序执行的，所以使用Map
    // Symbol()生成的数据也是唯一的！
    const uuid = Symbol()
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = new Map
    }
    this.eventList[eventName].set(uuid, callback)
    return uuid
  },

  unsubscribe: function(eventName, listenerKey) {
    if (!this.eventList[eventName] || !listenerKey) return
    
    this.eventList[eventName].delete(listenerKey)
  },

  publish: function(eventName, eventData) {
    if (!this.eventList[eventName]) return 

    this.eventList[eventName].forEach((cb) => {
      try {
        cb(eventData)
      } catch(err) {
        console.log(err)
      }
    })
  }
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




/*
评分重点：
1. subcribe, unsubscribe核心实现 [0 - 5]
2. 执行函数需要考虑函数作用域，支持scope指定 [0 - 2]
3. publish 执行队列，需考虑函数catch捕获，避免后续函数无法执行 [0 - 3]
*/
 
 
// 已有GUID函数，直接调用即可
// const guid = GUID();
 
class MessageCenter1 {
  static messageQueue = {};

  /**
   * 监听topic
   * @param {*} message
   * @param {*} handler
   * @param {*} scope
   */
  static subscribe(message, handler, scope) {
      let uuid = GUID();
      if (message && handler) {
          if (!MessageCenter.messageQueue[message]) {
              MessageCenter.messageQueue[message] = [];
          }
          MessageCenter.messageQueue[message].push({
              uuid: uuid,
              scope: scope,
              handler: handler
          });
      }

      return uuid;
  }

  /**
   * 移除整个topic
   * @param {*} message
   */
  static unsubscribe(message) {
      if (MessageCenter.messageQueue[message]) {
          delete MessageCenter.messageQueue[message];
      }
  }

  /**
   * 移除topic下特定的监听
   * @param {*} message
   * @param {*} uuid
   */
  static removeListener(message, uuid) {
      if (!uuid) {
          return
      }
      let listenerQueue = MessageCenter.messageQueue[message]
      if (listenerQueue) {
          let idx = 0;
          while(idx < listenerQueue.length) {
              let item = listenerQueue[idx];
              if(item.uuid === uuid) {
                  listenerQueue.splice(idx, 1);
              }
              idx++;
          }
      }

      MessageCenter.messageQueue[message] = listenerQueue;
  }

  static publish(message, args) {
       
      if (MessageCenter.messageQueue[message]) {
          for (let objectIndex = 0; objectIndex < (MessageCenter.messageQueue[message] || []).length; objectIndex++) {
              let item = MessageCenter.messageQueue[message][objectIndex];
              try {
                  item.handler && item.handler.apply(item.scope ? item.scope : window, args);
              } catch (error) {
                  console.log(error)
              }
          }
      }
  }
}
