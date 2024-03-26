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


function deepTree(root) {
   
}