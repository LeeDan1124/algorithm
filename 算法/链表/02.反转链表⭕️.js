// ✅
// 给定一个单链表的头结点pHead(该头节点是有值的，比如在下图，它的val是1)，长度为n，反转该链表后，返回新链表的表头。

// 要求：空间复杂度 O(1) ，时间复杂度 O(n)。

// 如当输入链表{1,2,3}时，
// 经反转后，原链表变为{3,2,1}，所以对应的输出为{3,2,1}。
// 以上转换过程如下图所示：

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ListNode(x){
    this.val = x;
    this.next = null;
}

const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(3)
const node4 = new ListNode(4)
const node5 = new ListNode(5)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

// 反转链表
function reverseLink(link) {

    if (!link || !link.next) return link

    let preP = null
    let curP = link
    let nextP = link.next
    while(curP) {
        curP.next = preP
        preP = curP
        curP = nextP
        nextP = nextP ? nextP.next : null
    }
    return preP
}
