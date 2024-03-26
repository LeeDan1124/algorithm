/**
 * 输入：{2,5,1,9},5
 * 返回值：{2,1,9}
 * 说明：给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 2 -> 1 -> 9   
 */

function ListNode(x){
    this.val = x;
    this.next = null;
}

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * @param head ListNode类 
 * @param val int整型 
 * @return ListNode类
 */
 function deleteNode( head ,  val ) {
    // write code here
}
let node = {val: 2, next: {val: 5, next: {val: 1, next: {val: 9, next:null}}}}
console.log(JSON.stringify(deleteNode(node, 5)))
module.exports = {
    deleteNode : deleteNode
};