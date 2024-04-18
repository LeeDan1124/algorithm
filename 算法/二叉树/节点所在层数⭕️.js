// 如果把根节点看做第 1 层，如何打印出每一个节点所在的层数？
function getNodeLevel (tree) {
    if (!tree) return

    const levelMap = new Map()

    const getLevel = (tree, curLevel) => {
        if (!tree) return
        levelMap.set(tree.val, curLevel)
        getLevel(tree.left, curLevel + 1)
        getLevel(tree.right, curLevel + 1)
    }
    getLevel(tree, 1)
    return levelMap
}


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

console.log(getNodeLevel(one))