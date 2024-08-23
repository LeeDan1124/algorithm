// 有向加权图-领接表实现
/**
[
    [{to: 1, weight: 1}, {to: 2, weight: 2}],
    [{to: 2, weight: 3}, {to: 0, weight: 4}]
]
 */
class WeightedDigraph {
  // V: 节点总数
  constructor(V) {
    // 这样填充的数组里面每一项数组元素执向的地址都是一样的，因为.fill 方法会在整个数组中重复使用同一个空数组对象
    // this.list = new Array(V).fill([]);

    this.list = new Array(V).fill(null).map((_) => []);
  }

  // 添加一条边（带权重）
  addEdge(from, to, weight) {
    this.list[from].push({ to, weight });
  }

  // 删除一条边
  removeEdge(from, to) {
    this.list[from] = this.list[from].filter((i) => i.to !== to);
  }

  // 判断两个节点是否相邻
  hasEdge(from, to) {
    return this.list[from].some((i) => i.to === to);
  }

  // 返回一条边的权重
  weight(from, to) {
    return this.list[from].find((i) => i.to === to)
      ? this.list[from].find((i) => i.to === to).weight
      : "No such edge";
  }

  // 返回某个节点的所有邻居节点和对应权重
  neighbors(v) {
    return this.list[v];
  }

  // 返回节点总数
  size() {
    return this.list.length;
  }
}




// 有向加权图-领接矩阵实现
/**
 [
    [0, 1, 0],
    [1, 0, 1]
    [0, 1, 0]
 ]
 */
class WeightedDigraph1 {

  // V: 节点总数
  constructor(V) {
    this.list = new Array(V).fill(null).map((_) => new Array(V).fill(0));
  }

  // 添加一条边（带权重）
  addEdge(from, to, weight) {
    this.list[from][to] = weight;
  }

  // 删除一条边
  removeEdge(from, to) {
    this.list[from][to] = 0;
  }

  // 判断两个节点是否相邻
  hasEdge(from, to) {
    return this.list[from][to] !== 0;
  }

  // 返回一条边的权重
  weight(from, to) {
    return this.list[from][to];
  }

  // 返回某个节点的所有邻居节点和对应权重
  neighbors(v) {
    return this.list[v].reduce((acc, cur, i) => {
      if (cur !== 0) {
        acc.push({
          to: i,
          weight: cur,
        })
      }
      return acc
    }, [])
  }

  // 返回节点总数
  size() {
    return this.list.length;
  }
}

export {
  WeightedDigraph,
  WeightedDigraph1
}

// 测试代码
// var graph = new WeightedDigraph1(3);
// graph.addEdge(0, 1, 1);
// graph.addEdge(1, 2, 2);
// graph.addEdge(2, 0, 3);
// graph.addEdge(2, 1, 4);

// console.log(graph.hasEdge(0, 1)); // true
// console.log(graph.hasEdge(1, 0)); // false

// graph.neighbors(2).forEach(function (edge) {
//   console.log(2 + " -> " + edge.to + ", weight: " + edge.weight);
// });
// // 2 -> 0, weight: 3
// // 2 -> 1, weight: 4

// graph.removeEdge(0, 1);
// console.log(graph.hasEdge(0, 1)); // false
