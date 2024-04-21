/**
 * 众所周知，为了用户更好地体验，防抖的延时是不能太长的，一般在我的项目中都是300ms，
 * 但是这只能管到请求时间 < 300ms的接口请求，如果有一个接口请求需要2000ms，那么此时防抖也做不到完全限制重复请求，
 * 所以咱们需要额外做一下取消重复请求的处理
 *
 * 实现思路：简单说就是，利用Promise.race方法，给每一次请求的身边安装一颗雷，
 * 如果第一次请求后，又接了第二次重复请求，那么就执行第一次请求身边的雷，把第一次请求给炸掉，以此类推。
 */

// 测试
const cancelPromise = new CancelablePromise();
// 模拟频繁请求5次
for (let i = 0; i < 5; i++) {
  cancelPromise
    .request(request(2000))
    .then((res) => console.log(res)) // 最后一个 最后赢家是我
    .catch((err) => console.error(err)); // 前四个 取消重复请求
}
