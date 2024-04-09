/**
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 */
 function Link(val, next) {
    this.val = val
    this.next = next
}

const node1 = new Link(1, null)
const node2 = new Link(2, null)
const node3 = new Link(2, null)
const node4 = new Link(1, null)
// const node5 = new Link(3, null)
// const node6 = new Link(2, null)
// const node7 = new Link(1, null)

node1.next = node2
node2.next = node3
node3.next = node4
// node4.next = node5
// node5.next = node6
// node6.next = node7

function isHUiwen(link) {

    if (!link) return false

    const arr = []

    while(link) {
        arr.push(link.val)
        link = link.next
    }

    let left = 0, right = arr.length - 1

    while(arr[left] === arr[right] && left <= right) {
        left++
        right--
    }

    return arr[left] === arr[right] ? true : false
}

// console.log(JSON.stringify(node1))
// console.log(JSON.stringify(reverseLink(node1)))
console.log(JSON.stringify(isHUiwen(node1)))