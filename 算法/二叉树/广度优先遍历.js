function Tree(node) {
    this.val = node
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


// 广度优先遍历其实就是层级遍历
function bfs(root) {

   
}

console.log(bfs(one))