/**
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
输出：[3,9,20,null,null,15,7]
示例 2:

输入：inorder = [-1], postorder = [-1]
输出：[-1]

 */
function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}
var buildTree = function(inorder, postorder) {
  if (!inorder || !postorder || !inorder.length || !postorder.length) return null
 
  const rootVal = postorder[postorder.length - 1]
  const rootIndexinMid = inorder.indexOf(rootVal)

  const tree = new TreeNode(rootVal)

  const leftInorder = inorder.slice(0, rootIndexinMid)
  const rightInorder = inorder.slice(rootIndexinMid + 1, inorder.length)

  const leftPost = postorder.slice(0, leftInorder.length)
  const rightPost = postorder.slice(leftInorder.length, postorder.length - 1)

  tree.left = buildTree(leftInorder, leftPost)
  tree.right = buildTree(rightInorder, rightPost)

  return tree
}
const inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
console.log(buildTree(inorder, postorder))