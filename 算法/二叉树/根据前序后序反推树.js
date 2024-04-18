
// 根据数组推树：如果空节点使用null或者其他标识表示的话是可以反推出二叉树的，但是如果空节点没有特定标识标识，那么必须通过先中后序中的任意两种数组才能反推出二叉树
// 先序数组[ 1, 2, 4, 6, null, 7, null, null, null, null, 3, 5, null, null, null ]
function preGetTree(arr) {
   
}
// console.log(JSON.stringify(preGetTree([ 1, 2, 4, 6, null, 7, null, null, null, null, 3, 5, null, null, null ])))


// 后序数组[ null, null, null, 7, 6, null, 4, null, 2, null, null, 5, null, 3, 1 ]
function lastGetTree(arr) {
    
}
console.log(JSON.stringify(lastGetTree([ null, null, null, 7, 6, null, 4, null, 2, null, null, 5, null, 3, 1 ])))


// 中序数组[ null, 6, null, 7, null, 4, null, 2, null, 1, null, 5, null, 3, null ] 
// 中序数组是反推不出二叉树的！！
