/*
给出一个升序排序的链表 L，删除链表中重复2次以上出现的元素，只保留原链表中出现一次或重复2次 的元素。

例如：

给出的链表为 1→2→3→3→4→4→4→4→5, 返回 1→2→3→3→5.

给出的链表为1→1→1→2→3, 返回 2→3.

输入格式:
第一行包含头节点地址，总节点数量 N （1≤N≤100000）

节点地址用一个 5 位非负整数表示（可能有前导 0），NULL 用 −1 表示。

接下来 N 行，每行描述一个节点的信息，格式如下：

Address Data Next

其中 Address 是节点地址，Data 是一个绝对值不超过100000的整数，Next 是下一个节点的地址。



输出格式:
输出删除有序链表中重复2次以上元素后的链表。每个结点占一行，按输入的格式输出。


输入样例:
在这里给出一组输入。例如：

00100 10
99999 3 87654
87654 4 11111
55555 8 -1
44444 4 55555
23854 2 00000
11111 4 22222
00100 1 23854
22222 4 33333
00000 3 99999
33333 4 44444
输出样例:
在这里给出相应的输出。例如：

00100 1 23854
23854 2 00000
00000 3 99999
99999 3 55555
55555 8 -1
*/

function go(headAddr, nodeNum, linkList) {
  const numMap = new Map();
  const sortLink = [];
  let curAddr = headAddr;
  let i = 1;
  while (i <= nodeNum) {
    const node = linkList.find((i) => i.addr === curAddr);

    const nodeCounts = numMap.get(node.data) || 0;
    numMap.set(node.data, nodeCounts + 1);

    sortLink.push(node);
    curAddr = node.next;
    i++;
  }

  for (let i = 0; i < sortLink.length; i++) {
    const curNode = sortLink[i];
    if (numMap.get(curNode.data) > 2) {
      sortLink.splice(i, 1);
      i--;
    }
  }

  for (let i = 0; i < sortLink.length; i++) {
    const { addr, data, next } = sortLink[i];

    let nextAddr = -1;
    if (sortLink[i + 1]) {
      nextAddr = sortLink[i + 1].addr;
    }
    console.log(`${addr} ${data} ${nextAddr || -1}`);
  }
}







// ---------------处理输入-------------
var fs = require("fs");
var buf = "";

process.stdin.on("readable", function () {
  var chunk = process.stdin.read();
  if (chunk) buf += chunk.toString();
});

let headAddr;
let nodeNum;
let linkList = [];
process.stdin.on("end", function () {
  buf.split("\n").forEach(function (line, index) {
    if (!line) return;
    var tokens = line.split(" ");

    if (index === 0) {
      headAddr = tokens[0];
      nodeNum = +tokens[1];
    } else {
      linkList.push({
        addr: tokens[0],
        data: +tokens[1],
        next: tokens[2],
      });
    }
  });
  go(headAddr, nodeNum, linkList);
});
