function treeMaxWidth(tree) {
    if (!tree) return 0

    let curMax = 0

    const getDeep = (tree) => {
        if (!tree) return 0

        const leftDeep = getDeep(tree.left)
        const rightDeep = getDeep(tree.right)

        curMax = curMax > leftDeep + rightDeep ? curMax : leftDeep + rightDeep

        return Math.max(leftDeep, rightDeep) + 1
    }
    getDeep(tree)
    return curMax
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
