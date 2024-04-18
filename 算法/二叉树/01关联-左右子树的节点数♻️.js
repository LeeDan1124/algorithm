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


// 如何打印出每个节点的左右子树各有多少节点？
const res = new Map()
function getNodeBranchNum(tree) {
    if (!tree) return 0

    let leftNode = getNodeBranchNum(tree.left)

    let rightNode = getNodeBranchNum(tree.right)

    res.set(tree.val, [leftNode, rightNode])

    return leftNode + rightNode + 1
}
getNodeBranchNum(one)
console.log(res)