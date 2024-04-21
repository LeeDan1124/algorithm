/**
 * 给定两个整数数组，preorder 和 postorder ，其中 preorder 是一个具有 无重复 值的二叉树的前序遍历，postorder 是同一棵树的后序遍历，重构并返回二叉树。

如果存在多个答案，您可以返回其中 任何 一个。

输入：preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
输出：[1,2,3,4,5,6,7]
示例 2:

输入: preorder = [1], postorder = [1]
输出: [1]
前序：根左右
后序：左右根

 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
var constructFromPrePost = function (preorder, postorder) {
    if (!preorder || !preorder.length || !postorder || !postorder.length) return null

    // 通过前序推出来的
    const root = preorder[0]
    const leftRoot = preorder[1]
    const leftRootIndexInPost = postorder.indexOf(leftRoot)
    const leftPostorder = postorder.slice(0, leftRootIndexInPost + 1)
    const rightPostOrder = postorder.slice(leftRootIndexInPost + 1, postorder.length - 1)

    const leftLength = leftRootIndexInPost + 1

    // 通过后序推出来的 TODO 这里需要用前序的长度进行推，否则会出现，左树的根和右树的根是同一个的情况，例如[1,2][2,1]
    // const rightRoot = postorder[postorder.length - 2]
    // const rightRootIndexInPre = preorder.indexOf(rightRoot)
    const rightPreorder = preorder.slice(leftLength + 1, preorder.length)
    const leftPreorder = preorder.slice(1, leftLength + 1)

    const tree = new TreeNode(
        root,
        constructFromPrePost(leftPreorder, leftPostorder),
        constructFromPrePost(rightPreorder, rightPostOrder),
    )

    return tree
};
