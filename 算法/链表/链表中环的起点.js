function Link(val, next) {
    this.val = val
    this.next = next
}

const node1 = new Link(1, null)
const node2 = new Link(2, null)
const node3 = new Link(3, null)
const node4 = new Link(4, null)
const node5 = new Link(5, null)
const node6 = new Link(6, null)
const node7 = new Link(7, null)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6
node6.next = node7

function hasCircle(link) {

}   

console.log(JSON.stringify(hasCircle(node1)))