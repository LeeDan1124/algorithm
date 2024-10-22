
/*
从实验室出来后，你忽然发现你居然把自己的电脑落在了实验室里，但是实验室的老师已经把大门锁上了。
更糟的是，你没有那个老师的电话号码。你开始给你知道的所有人打电话，询问他们有没有老师的电话，如果没有，他们也会问自己的同学来询问电话号码。
那么，你能联系到老师并且拿到电脑吗？

存在多组测试样例
每组样例的第一行分别是两个整数n(1<n<=50)，m(1<m<=2000)，n是在题目当中出现的人数，其中你的序号是1号，实验室老师的序号是n。
接下来的m行，每行有两个整数x(1<=x<=n)，y(1<=y<=n)，代表x有y的电话号码。
[
    [5 5],
    [1 3],
    [2 3],
    [3 4],
    [2 4],
    [4 5]
]

和 04 题一样，只是这里需要单独处理一下数据
*/
function canCallTeacher(list) {
  const [peopels] = list[0];
  const relationShip = new Array(peopels).fill(null).map((x) => []);

  for (let i = 1; i < list.length; i++) {
    const [peopelIndex, lineToPeopelIndex] = list[i];
    relationShip[peopelIndex - 1].push(lineToPeopelIndex - 1);
  }

  /*
  relationShip:
    [
      [3],
      [3,4],
      [4]
      [5]
    ]
    */
  const visited = new Array(peopels).fill(false);
  const queue = [0];
  while (queue.length) {
    const curPIndex = queue.shift();
    if (visited[curPIndex]) {
      continue;
    }
    visited[curPIndex] = true;
    const curPR = relationShip[curPIndex];
    if (curPR.includes(peopels - 1)) {
      return "Yes";
    }
    queue.push(...curPR);
  }
  return "No";
}






 // [[2],[2,3],[3],[4]]
 function go(list, n){
  const visited = new Array(list.length).fill(false)
  const queue = [0]
  
  while(queue.length) {
    const curPIndex = queue.shift()
    if (visited[curPIndex]) {
      continue
    }
    visited[curPIndex] = true

    const curHasKeys = list[curPIndex]
    if (curHasKeys.includes(n)) {
      return 'Yes'
    }
    queue.push(...curHasKeys)
  }

  return 'No'
}


console.log(go([[1],[2],[],[0]], 3))
