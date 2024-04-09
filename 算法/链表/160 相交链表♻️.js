/**
 * 给你输入两个链表的头结点 headA 和 headB，这两个链表可能存在相交。
如果相交，你的算法应该返回相交的那个节点；如果没相交，则返回 null。
 */
function Link(val, next = null) {
    this.val = val
    this.next = next
}


function getIntersectionNode(link1, link2) {
    if(!link1 || !link2) return null 

    let curp1 = link1
    let curp2 = link2

    while(curp1 !== curp2) {
        curp1 = !curp1 ? link2 : curp1.next
        curp2 = !curp2 ? link1 : curp2.next
    }

    return curp1


    // 注意💡 以下先把两个链表合成一个的想法是不可行的🙅，因为链表是对象，连起来会造成无限循环
    // const p1 = new Link(-999, link1)
    // const p2 = new Link(-999, link2)

    // // 将两个链表连起来
    // let curP1 = p1
    // let curP2 = p2

    // while(link1) {
    //     curP1.next = link1
    //     curP1 = curP1.next
    //     link1 = link1.next
    // }
    // curP1.next = p2.next


    // while(link2) {
    //     curP2.next = link2
    //     curP2 = curP2.next
    //     link2 = link2.next
    // }
    // curP2.next = p1.next

    // // 遍历两个链表
    // let cp1 = p1.next
    // let cp2 = p2.next

    // while(cp1 !== cp2 && cp1 !== null && cp2 !== null) {
    //     cp1 = cp1.next
    //     cp2 = cp2.next
    // }

    // return cp1 === null || cp2 !== null ? null : cp1
}

// [4,1,8,4,5]
// [5,6,1,8,4,5]

const node1 = new Link(4)
const node2 = new Link(1)
const node3 = new Link(8)
const node4 = new Link(4)
const node5 = new Link(5)
const node6 = new Link(5)
const node7 = new Link(6)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

node6.next = node7
node7.next = node2

console.log(getIntersectionNode(node1, node6))