/**
 * 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
示例 2:

输入：root = []
输出：[]

 */
var connect = function(root) {
  if (!root) return root

  const nodeList = [[root]]

  while(!!nodeList.length) {
      const curLevel = nodeList.shift()

      const nextLevel = []

      for(let i = 0; i < curLevel.length; i++) {
          const curNode = curLevel[i]
          const nextNode = curLevel[i + 1] || null
          curNode.next = nextNode

          curNode.left && nextLevel.push(curNode.left)
          curNode.right && nextLevel.push(curNode.right)
      }

      nextLevel.length && nodeList.push(nextLevel)
  }

  return root
}
function Tree(val, left, right, next) {
  this.val = val === undefined ? null : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  this.next = next === undefined ? null : next;
};
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

console.log(JSON.stringify(connect(one)))