function Tree(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function TreeDepth(pRoot) {
  // write code here

  if (!pRoot) return 0

  const leftDeep = TreeDepth(pRoot.left)
  const rightDeep = TreeDepth(pRoot.right)

  return Math.max(leftDeep, rightDeep) + 1
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

console.log(TreeDepth(one))
module.exports = {
  TreeDepth: TreeDepth,
};
