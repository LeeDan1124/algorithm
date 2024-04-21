/**
 * 
输入两个无环的单向链表，找出它们的第一个公共结点，如果没有公共节点则返回空。（注意因为传入数据是链表，
所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

要求：空间复杂度 O(1)，时间复杂度 O(n)O
输入：{1,2,3},{4,5},{6,7}
返回值：{6,7}
说明：
第一个参数{1,2,3}代表是第一个链表非公共部分，第二个参数{4,5}代表是第二个链表非公共部分，最后的{6,7}表示的是2个链表的公共部分
这3个参数最后在后台会组装成为2个两个无环的单链表，且是有公共节点的
*/

/*function ListNode(x){
    this.val = x;
    this.next = null;
}
 *  链表1: 1 --> 2 --> 3 --> 6 --> 7 --> null --> 4 --> 5 --> 6 --> 7 --> null
 *  链表2: 4 --> 5 --> 6 --> 7 --> null --> 1 --> 2 --> 3 --> 6 --> 7 --> null
 * 
 * 让p1指针遍历完链表1后继续遍历链表2，p2指针遍历完链表2后继续遍历链表1，链表1+链表2的长度是一定的，那么在两个链表合成一条链表后，公共结点肯定在该链表的最后几位，
 * 如果p1===p2了，那么就是第一个公共结点
 * p1: 1 --> 2 --> 3 --> 9 --> 8 --> 4 --> 5 --> 6 --> 7 --> null
 * p2: 4 --> 5 --> 6 --> 7 --> 1 --> 2 --> 3 --> 9 --> 8 --> null
 */

const p1 = { val: 1, next: { val: 2, next: null } };
const p2 = { val: 3, next: { val: 4, next: { val: 5, next: null } } };
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  if (!pHead1 || !pHead2) return null;

  let p1 = pHead1;
  let p2 = pHead2;

  while (p1 || p2) {
    if (p1 === p2) return p1;
    p1 = !p1 ? pHead1 : p1.next;
    p2 = !p2 ? pHead2 : p2.next;
  }

  return null;
}

console.log(FindFirstCommonNode(p1, p2));
module.exports = {
  FindFirstCommonNode: FindFirstCommonNode,
};
