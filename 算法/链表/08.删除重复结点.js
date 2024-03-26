/**
 * 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 
 * 例如，链表 1->2->3->3->4->4->5  处理后为 1->2->5
 * 进阶：空间复杂度 O(n)  ，时间复杂度 O(n)
 * 例如输入{1,2,3,3,4,4,5}时，对应的输出为{1,2,5}，
 */

function ListNode(x){
    this.val = x;
    this.next = null;
}
function deleteDuplication(pHead)
{
    // write code here
}

let node = {val: 1, next: {val: 1, next: {val: 2, next: null}}}
console.log(deleteDuplication(node))
module.exports = {
    deleteDuplication : deleteDuplication
};

// {1,2,3,3,4,4,5,5}