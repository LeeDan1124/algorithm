/**
 * 二叉树的右视图
 */
function Tree(val) {
    this.val = val
    this.left = null
    this.right = null
}

let one = new Tree(1)
let two = new Tree(2)
let three = new Tree(3)
let four = new Tree(4)
let five = new Tree(5)
let six = new Tree(6)
let seven = new Tree(7)
let ba = new Tree(8)
let jiu = new Tree(9)
let ten = new Tree(10)

one.left = two
one.right = three
two.left = four
two.right = ba
three.left = five
three.right = jiu
four.left = six
four.right = ten
six.right = seven


//二叉树的层级遍历:利用nextLevel记录下一层级的节点
// https://www.cnblogs.com/grandyang/p/4051321.html
function getTreelevelVal(root) {

   
}
// console.log(getTreelevelVal(one), '-====---')




//二叉树的层级遍历：不利用nextLevel记录下一层级的节点
// https://www.cnblogs.com/grandyang/p/4051321.html
function getTreelevelVal1(root) {

   
}
console.log(getTreelevelVal1(one), '----')




// 二叉树之字形层级遍历
function Z(root) {

   
}
console.log(Z(one), '====>>>')






// 二叉树的右视图
function rightOfTree(root) {

}
// console.log(rightOfTree(one))