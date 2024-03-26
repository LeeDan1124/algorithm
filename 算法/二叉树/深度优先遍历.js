function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");
var f = new Node("f");
var g = new Node("g");

a.left = c;
a.right = b;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
// https://www.51cto.com/article/614590.html
// 递归查找
function deepSearch(root,target){
   
}

// 不递归
/**
 * stack是栈结构，先压入根节点-->弹出根节点--->压入右节点、左节点-->弹出左节点-->压入左节点的右节点、左节点……
 */
function nonDeepSearch(root, target) {
    
}
console.log(nonDeepSearch(a,'c'));

