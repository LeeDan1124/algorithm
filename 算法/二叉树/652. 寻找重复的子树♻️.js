/**
 * 给你一棵二叉树的根节点 root ，返回所有 重复的子树 。

对于同一类的重复子树，你只需要返回其中任意 一棵 的根结点即可。

如果两棵树具有 相同的结构 和 相同的结点值 ，则认为二者是 重复 的。


输入：root = [1,2,3,4,null,2,4,null,null,4]
输出：[[2,4],[4]]

输入：root = [2,1,1]
输出：[[1]]

输入：root = [2,2,2,3,null,3,null]
输出：[[2,3],[3]]

 */
var findDuplicateSubtrees = function (root) {
  if (!root) return [];

  const subTreeSet = new Set();
  // 这里需要额外的一个Map用来记录节点的重复次数，不然只使用res的Set去重不了(因为Set往里面塞节点的时候，节点的存储地址不同，不会去重的)
  const duplicateNumber = new Map();

  const res = new Set();

  const getSubtrees = (tree) => {
    if (!tree) return "#";

    const left = getSubtrees(tree.left);
    const right = getSubtrees(tree.right);

    const curTreeStr = `${tree.val},${left},${right}`;

    if (subTreeSet.has(curTreeStr) && !duplicateNumber.has(curTreeStr)) {
      res.add(tree);
      duplicateNumber.set(curTreeStr, 1);
    } else {
      subTreeSet.add(curTreeStr);
    }

    return curTreeStr;
  };
  getSubtrees(root);
  return [...res];
};
