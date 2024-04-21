/**
 * 二叉树的右视图
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

let one = new TreeNode(1);
let two = new TreeNode(2);
let three = new TreeNode(3);
let four = new TreeNode(4);
let five = new TreeNode(5);
let six = new TreeNode(6);
let seven = new TreeNode(7);
let ba = new TreeNode(8);
let jiu = new TreeNode(9);
let ten = new TreeNode(10);

one.left = two;
one.right = three;
two.left = four;
two.right = ba;
three.left = five;
three.right = jiu;
four.left = six;
four.right = ten;
six.right = seven;

// 二叉树的右视图
function rightOfTree(root) {
  if (!root) return [];

  const res = [];
  const nodeList = [[root]];

  while (nodeList.length) {
    const curLevel = nodeList.shift();

    const nextLevel = [];

    for (let i = 0; i < curLevel.length; i++) {
      const curNode = curLevel[i];

      curNode.left && nextLevel.push(curNode.left);
      curNode.right && nextLevel.push(curNode.right);

      if (i === curLevel.length - 1) {
        res.push(curNode.val);
      }
    }

    !!nextLevel.length && nodeList.push(nextLevel);
  }

  return res;
}
console.log(rightOfTree(one));
