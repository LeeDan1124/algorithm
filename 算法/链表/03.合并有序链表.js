// ✅
/**
    输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。
    数据范围： 0 \le n \le 10000≤n≤1000，-1000 \le 节点值 \le 1000−1000≤节点值≤1000
    要求：空间复杂度 O(1)，时间复杂度 O(n)

    如输入{1,3,5},{2,4,6}时，合并后的链表为{1,2,3,4,5,6}，所以对应的输出为{1,2,3,4,5,6}，转换过程如下图所示：
 */

function ListNode(x){
    this.val = x;
    this.next = null;
}

// {1,2,3,4}
// {3,3,3}
// -9999 -> 1,2,3,3,3,3,null
function Merge(pHead1, pHead2)
{
    if (!pHead1) return pHead2
    if (!pHead2) return pHead1

    const vNode = new ListNode(-9999)
    let curPoint = vNode
    let p1 = pHead1
    let p2 = pHead2

    while(p1 && p2) {
        if (p1.val <= p2.val) {
            curPoint.next = p1
            p1 = p1.next
        } else {
            curPoint.next = p2
            p2 = p2.next
        }
        curPoint = curPoint.next
    }
    if (!p2 && p1) {
        curPoint.next = p1
    }

    if (!p1 && p2) {
        curPoint.next = p2
    }
    return vNode.next
}

module.exports = {
    Merge : Merge
};