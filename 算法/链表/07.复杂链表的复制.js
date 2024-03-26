/**
 * 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），
 * 请对此链表进行深拷贝，并返回拷贝后的头结点。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）。 
 * 下图是一个含有5个结点的复杂链表。图中实线箭头表示next指针，虚线箭头表示random指针。
 * 
 * 输入：{1,2,3,4,5,3,5,#,2,#}
 * 返回值：{1,2,3,4,5,3,5,#,2,#}
 */

 function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}
let p = {label: 1, next:{label: 2, next: {label: 3, next: null, random: null}, random: null}, random:null}
function Clone(pHead)
{
    // write code here
}
console.log(Clone(p))
module.exports = {
    Clone : Clone
};