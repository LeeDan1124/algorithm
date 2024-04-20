/**
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。
输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]
示例 2：

输入：root = []
输出：[]
示例 3：

输入：root = [0]
输出：[0]

 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
var flatten = function (root) {
    if (!root) return root

    flatten(root.left)
    flatten(root.right)

    let leftLink = root.left
    let rightLink = root.right

    root.left = null
    root.right = leftLink

    let p = root
    while(p.right) {
        p = p.right
    }
    p.right = rightLink

    return root

}



// TODO LD:这个写法为什么不行呢???? 不清楚
var flatten1 = function(root) {
    if (!root) return root

    const link = new TreeNode(root.val)

    const leftLink = flatten1(root.left)
    const rightLink = flatten1(root.right)

    link.right = leftLink

    let p = link
    while(p.right) {
        p = p.right
    }
    p.right = rightLink
    return link
}

console.log(JSON.stringify(flatten1(new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, null, new TreeNode(6))))))
