// students =   [1,1,1,0,0,1] 队列 [11001] [10011] [00111] [0111] [111] [111]
// sandwiches = [1,0,0,0,1,1] 栈   [00011] [00011] [00011] [0011] [011] [011]
/**
 学校的自助午餐提供圆形和方形的三明治，分别用数字 0 和 1 表示。所有学生站在一个队列里，每个学生要么喜欢圆形的要么喜欢方形的。
餐厅里三明治的数量与学生的数量相同。所有三明治都放在一个 栈 里，每一轮：
如果队列最前面的学生 喜欢 栈顶的三明治，那么会 拿走它 并离开队列。
否则，这名学生会 放弃这个三明治 并回到队列的尾部。
这个过程会一直持续到队列里所有学生都不喜欢栈顶的三明治为止。

https://leetcode.cn/problems/number-of-students-unable-to-eat-lunch/submissions/567276675/
 */

// 循环跳出的时机是：学生列表里没有人喜欢栈顶的面包了
function hasStudentsLikeTop(queue, sandwiches) {
  const topSandwich = sandwiches[0];
  return queue.some((x) => x === topSandwich);
}
function getStudentNumber(students, sandwiches) {
  const queue = [...students];
  while (queue.length && hasStudentsLikeTop(queue, sandwiches)) {
    const curStudent = queue.shift();
    if (sandwiches[0] === curStudent) {
      sandwiches.shift();
    } else {
      queue.push(curStudent);
    }
  }
  return queue.length;
}
