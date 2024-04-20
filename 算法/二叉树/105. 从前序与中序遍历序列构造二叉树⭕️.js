/**
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]
示例 2:

输入: preorder = [-1], inorder = [-1]
输出: [-1]
 
 */
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function buildTreeFromPreMid(pre, mid) {
  if (!pre || !pre.length || !mid || !mid.length) return null;

  const rootNodeVal = pre[0];
  const tree = new TreeNode(rootNodeVal)

  const rootIndex = mid.indexOf(rootNodeVal);
  const midLeftArr = mid.slice(0, rootIndex);
  const midRightArr = mid.slice(rootIndex + 1, mid.length);

  const preLeftArr = pre.slice(1, midLeftArr.length + 1)
  const preRightArr = pre.slice(midLeftArr.length + 1, pre.length)

  tree.left = buildTreeFromPreMid(preLeftArr, midLeftArr)
  tree.right = buildTreeFromPreMid(preRightArr, midRightArr)

  return tree
}
const preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
console.log(buildTreeFromPreMid(preorder, inorder))