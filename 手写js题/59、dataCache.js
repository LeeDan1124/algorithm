/**
 * 
 * 实现一个缓存 DataCache 类，要求包含 get(key) => value 和 set(key, value, ttl) 方法 
 * ( key 为 string，value 为任意值，ttl 为缓存时长，单位毫秒 )，
 * 1、针对同一 key 反复 set 可覆盖值和缓存时长，
 * 2、缓存 key 最多 100 条，
 * 3、采用 LRU 算法（缓存满后删除最久未使用的 key），
 * 4、注意及时清理过期缓存以保证 LRU 算法准确性
 */
class DataCache {
  constructor() {
    // 补全代码
  }
  // 补全代码
  get(key) {
    // 补全代码
  }
  set(key, value, ttl = Infinity) {
    // 补全代码
  }
}
 
let cache = new DataCache();
for (let i = 0; i < 100; i ++) {
  cache.set(`key_${i}`, `value_${i}`, 100);
}
for (let i = 0; i < 100; i += 2) {
  cache.get(`key_${i}`);
}
for (let i = 0; i < 3; i++) {
  cache.set(`foo_${i}`, `bar_${i}`, 300);
}
console.log("Show Cache (0ms):");
for (let i = 0; i < 10; i++) {
  console.log(`key_${i}: ${cache.get(`key_${i}`)}`);
}
 
setTimeout(() => {
  console.log("Show Cache (200ms):");
  for (let i = 0; i < 10; i++) {
    console.log(`key_${i}: ${cache.get(`key_${i}`)}`);
  }
  for (let i = 0; i < 3; i++) {
    console.log(`foo_${i}: ${cache.get(`foo_${i}`)}`);
  }
}, 200);
 
/* 输出如下: */
/*
Show Cache (0ms):
key_0: value_0
key_1: undefined
key_2: value_2
key_3: undefined
key_4: value_4
key_5: undefined
key_6: value_6
key_7: value_7
key_8: value_8
key_9: value_9
Show Cache (200ms):
key_0: undefined
key_1: undefined
key_2: undefined
key_3: undefined
key_4: undefined
key_5: undefined
key_6: undefined
key_7: undefined
key_8: undefined
key_9: undefined
foo_0: bar_0
foo_1: bar_1
foo_2: bar_2
*/