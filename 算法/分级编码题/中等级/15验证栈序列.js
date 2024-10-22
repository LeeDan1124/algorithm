/**
 *https://leetcode.cn/problems/validate-stack-sequences/submissions/573026224/
 */
function go(list) {
    const [pushed, popped] = list
    const numsLen = pushed.length
    const stack = []
  
    let listNum = 0
    while(listNum <= numsLen) {
      while(popped[0] !== stack[stack.length - 1]) {
        // 如果 pushed 为空，则说明所有的元素都压入栈了，但是此时还是没有能弹出栈的，则说明弹不出去了
        if (!pushed.length) {
            return false
        }
        stack.push(pushed.shift())
        listNum++
      }
  
      while(popped[0] === stack[stack.length - 1]) {
        // 如果 popped 和 stack 都为空，则说明所有的元素都弹出栈了
        if (!popped.length && !stack.length) {
            return true
        }
        stack.pop()
        popped.shift()
      }
    }
}







function go1(list) {
  const [pushed, popped] = list

  const stack = []
  let i = 0
  while(i <= pushed.length) {
    while(popped[0] === stack[stack.length - 1]) {
      if (!popped.length && !pushed.length) {
        return true
      }
      stack.pop()
      popped.shift()
    }

    while(popped[0] !== stack[stack.length - 1]) {
      if (!pushed.length) {
        return false
      }
      stack.push(pushed.shift())
      i++
    }
  }

}








console.log('👩‍👦', go([[1,2,3,4,5], [4,3,5,1,2]]))
console.log('👩‍👦', go([[ 1, 2, 3, 4, 5 ], [ 4, 5, 3, 2, 1 ]]))
