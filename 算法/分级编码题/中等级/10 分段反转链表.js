/**
 给定一个常数 K 和一个单链表 L，请你在单链表上每 K 个元素做一次反转，并输出反转完成后的链表。
如果链表最后一部分不足 K 个元素，则最后一部分不翻转。
例如，假设 L 为 1→2→3→4→5→6
如果 K=3，则你应该输出 3→2→1→6→5→4
如果 K=4，则你应该输出 4→3→2→1→5→6

输入格式:
第一行包含头节点地址，总节点数量 N 以及常数 K。1≤N≤100000，1≤K≤N 。
节点地址用一个 5 位非负整数表示（可能有前导 0），NULL 用 −1 表示。
接下来 N 行，每行描述一个节点的信息，格式如下：
Address Data Next
其中 Address 是节点地址，Data 是一个绝对值不超过100000的整数，Next 是下一个节点的地址。
输出格式:
将重新排好序的链表，从头节点开始，依次输出每个节点的信息，格式与输入相同。


输入样例:
在这里给出一组输入。例如：

00100 6 4
00000 4 99999
00100 1 12309
68237 6 -1
33218 3 00000
99999 5 68237
12309 2 33218
输出样例:
在这里给出相应的输出。例如：

00000 4 33218
33218 3 12309
12309 2 00100
00100 1 99999
99999 5 68237
68237 6 -1
 */

function reverseLink(head, nodesNum, K, nodes) {
  const linkNodes = [];

  // 把node按顺序连起来
  let curPoint = head;
  let n = 0;
  while (n < nodesNum) {
    const node = nodes.find((i) => i.address === curPoint);
    linkNodes.push(node);
    n++;
    curPoint = node.next;
  }

  // 每组以栈存储，用队列存储每组的数据
  const queue = [];
  let stack = [];
  for (let node of linkNodes) {
    if (stack.length < K) {
      stack.push(node);
    } else if (stack.length === K) {
      queue.push(stack);
      stack = [node];
    }
  }
  if (stack.length) {
    queue.push(stack);
  }

  // 连接
  let res = [];
  for (let stackItem of queue) {
    if (stackItem.length < K) {
      res.push(...stackItem);
      break;
    }
    while (stackItem.length) {
      res.push(stackItem.pop());
    }
  }

  // 更新指针
  for (let i = 0; i < res.length; i++) {
    res[i].next = res[i + 1] ? res[i + 1].address : -1;
  }

  res.forEach((item) => {
    console.log(`${item.address} ${item.data} ${item.next}`);
  });
}
