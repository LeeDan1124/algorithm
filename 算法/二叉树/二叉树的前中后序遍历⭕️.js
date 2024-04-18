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

one.left = two
one.right = three
two.left = four
three.left = five
four.left = six
six.right = seven


// 先序遍历
let res = []
function Pre(root) {
    if (!root) return

    res.push(root.val)
    Pre(root.left)
    Pre(root.right)
}
Pre(one)
// console.log(res, '===先序')


// 中序遍历
let res1 = []
function mid(root) {
    if (!root) return

    mid(root.left)
    res1.push(root.val)
    mid(root.right)
}
mid(one)
// console.log(res1, '===中序')



// 后序遍历
let res2 = []
function last(root) {
    if (!root) return 
    last(root.left)
    last(root.right)
    res2.push(root.val)
}
last(one)
// console.log(res2, '===后序')
