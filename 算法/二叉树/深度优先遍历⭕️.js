function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");
var f = new Node("f");
var g = new Node("g");

a.left = c;
a.right = b;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
// https://www.51cto.com/article/614590.html
// 递归查找 == 深度优先查找
function deepSearch(root, target) {
  if (!root) return;
  if (root.value === target) return root;
  const left = deepSearch(root.left, target);
  const right = deepSearch(root.right, target);
  return left || right;
}

// 不递归 == 广度优先查找
/**
 * stack是栈结构，先压入根节点-->弹出根节点--->压入右节点、左节点-->弹出左节点-->压入左节点的右节点、左节点……
 */
function nonDeepSearch(root, target) {
  if (!root) return;
  let nodes = [];
  const res = [];
  nodes.push(root);
  let curRoot = nodes.shift();

  while (curRoot) {
    if (curRoot.value === target) {
      return curRoot;
    }
    res.push(curRoot.value);
    curRoot.left && nodes.push(curRoot.left);
    curRoot.right && nodes.push(curRoot.right);
    curRoot = nodes.shift();
  }

  return res;
}
console.log(nonDeepSearch(a, "b"));
