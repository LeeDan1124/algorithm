/**
 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

示例 1：


输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
示例 2：

输入：head = [1], n = 1
输出：[]
示例 3：

输入：head = [1,2], n = 1
输出：[1]

 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(x){
    this.val = x;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// [0,1,2] 2
var removeNthFromEnd = function(head, n) {
    if (!head || !n) return head

    const vNode = new ListNode(-9999)
    vNode.next = head

    let left = vNode
    let right = vNode

    for(let i = 0; i <= n; i++) {
        right = right.next
    }

    while(right) {
        left = left.next
        right = right.next
    }

    left.next = left.next.next

    return vNode.next
};

const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(3)
const node4 = new ListNode(4)
const node5 = new ListNode(5)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

console.log(JSON.stringify(removeNthFromEnd(node1, 2)))