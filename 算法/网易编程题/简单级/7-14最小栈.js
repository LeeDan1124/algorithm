/**

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

MinStack() 初始化堆栈对象。

void push(int val) 将元素val推入堆栈。

void pop() 删除堆栈顶部的元素。

int top() 获取堆栈顶部的元素。

int getMin() 获取堆栈中的最小元素。

输入格式:
第一行输入是操作的序列，即MinStack类之中的成员函数；

第二行输入是成员函数所对应的参数，若没有参数则输入为 []

输出格式:
输出为对应序列中每个操作的返回值

输入样例:
在这里给出一组输入。例如：

push,push,push,getMin,pop,top,getMin
-2,0,-3,,,,
输出样例:
在这里给出相应的输出。例如：

null,null,null,-3,null,0,-2
解释:
MinStack minStack = new MinStack();

minStack.push(-2);

minStack.push(0);

minStack.push(-3);

minStack.getMin(); --> 返回 -3.

minStack.pop();

minStack.top(); --> 返回 0.

minStack.getMin(); --> 返回 -2.

提示:
-231 <= val <= 231 - 1

pop、top 和 getMin 操作总是在 非空栈 上调用

push, pop, top, and getMin最多被调用 3 * 104 次
 */

class MinStack {
  constructor() {
    this.stack = [];
    // 借助一个辅助栈
    this.minStack = [Infinity];
  }

  // 将元素val推入堆栈
  push(val) {
    this.stack.push(val);
    // 记录当前值推入栈时，栈里现有的数据的最小值是多少
    this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], val));
    return "null";
  }

  // 删除堆栈顶部的元素
  pop() {
    this.stack.pop();
    // 删除元素时，也要从minStack里删掉它对应的最小值
    this.minStack.pop();
    return "null";
  }

  // 获取堆栈顶部的元素
  top() {
    return this.stack[this.stack.length - 1];
  }

  // 获取堆栈中的最小元素 [-2, 0 ,-3] O(1)
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

function runTest(actions, args) {
  const myStack = new MinStack();
  return actions
    .reduce((res, curAction, index) => {
      const arg = args[index];
      res.push(myStack[curAction](arg));
      return res;
    }, [])
    .join(",");
}
