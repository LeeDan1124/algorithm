// 给定一个二叉树的根节点root，返回它的中序遍历结果。


// 输入格式:
// 给定一个二叉树的根节点root。
// 树上的节点数满足 0 <= n <= 1000, 每个节点的值满足 -1000 <= val <= 1000

// 输出格式:
// 输出中序遍历后结果。


// 输入样例:
// 在这里给出一组输入。例如：

// 1,null,2,3
// 在这里给出相应的输出。例如：

// 中序遍历后，结果输出为：1，3，2

// 1,3,2




function go(list) {
    const tree = buildTree(list)
  
    const res = []
    function mid(root) {
      if (!root) return
    
      mid(root.left)
      res.push(root.val)
      mid(root.right)
    }
    mid(tree)
    
    return res.join(',')
  }
  
  
  // 1,null,2,3
  function TreeNode(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
  function buildTree(list) {
    const root = new TreeNode(list[0])
    let listIndex = 1
    const queue = [root]
  
    while(listIndex <= list.length - 1) {
      const curNode = queue.shift()
      //这里必须写出这样，不能在TreeNode里直接返null，因为即使是null也是TreeNode的实例，left也算有值
      curNode.left = list[listIndex] ? new TreeNode(list[listIndex]) : null
      listIndex++
      curNode.right = list[listIndex] ? new TreeNode(list[listIndex]) : null
      listIndex++
  
      curNode.left && queue.push(curNode.left)
      curNode.right && queue.push(curNode.right)
    }
    return root
  }
  
  
  
  var fs = require('fs');
  var buf = '';
  
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk) buf += chunk.toString();
  });
  
  process.stdin.on('end', function() {
    buf.split('\n').forEach(function(line) {
      if(!line) {
        return
      }
      var tokens = line.split(',').map(x => x === 'null' ? null: x)
      console.log(go(tokens))
    });
  });