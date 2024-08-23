import { WeightedDigraph } from "./有向加权图.mjs"

// 无向加权图的实现只需要复用有向加权图的实现就行，只是添加/删除边时，需要加/删除两条
class WeightedUnDigraph {
    
    constructor(v) {
        this.list = new WeightedDigraph(v)
    }

    // 添加一条边（带权重）
    addEdge(from, to, weight) {
        this.list.addEdge(from, to, weight)
        this.list.addEdge(to, from, weight)
    }

    // 删除一条边
    removeEdge(from, to) {
        this.list.removeEdge(from, to)
        this.list.removeEdge(to, from)
    }

    // 判断两个节点是否相邻
    hasEdge(from, to) {
        return this.list.hasEdge(from, to)
    }

    // 返回一条边的权重
    weight(from, to) {
        return this.list.weight(from, to)
    }

    // 返回某个节点的所有邻居节点和对应权重
    neighbors(v) {
        return this.list.neighbors(v)
    }

    // 返回节点总数
    size() {
        return this.list.size()
    }
}

// 测试代码
var graph = new WeightedUnDigraph(3);
graph.addEdge(0, 1, 1);
graph.addEdge(1, 2, 2);
graph.addEdge(2, 0, 3);

console.log(graph.hasEdge(0, 1)); // true
console.log(graph.hasEdge(1, 0)); // true

graph.neighbors(2).forEach(function(edge) {
    console.log(2 + " <-> " + edge.to + ", wight: " + edge.weight);
});
// 2 <-> 1, wight: 2
// 2 <-> 0, wight: 3

graph.removeEdge(0, 1);
console.log(graph.hasEdge(0, 1)); // false
console.log(graph.hasEdge(1, 0)); // false