// 并查集算法
/**
 *     1                  4
      / \  \             /  \
     2   3   7           5    6
     /
     0
以上图(两颗树)可以表示为：
 parentList: 2,1,1,1,4,4,4,1
 nodeList  : 0 1 2 3 4 5 6 7
 */
class UF {
    // n 为图中节点的个数
    constructor (n) {
        // 连通分量个数
        this.group = n
        // 存储每个节点的父节点[初始时，每个节点的父亲都是自己]
        this.parent = Array.from({length: n}, (_, index) => index)
    }

    // 将 p 和 q 连接
    union (p, q) {
        const rootP = this.find(p)
        const rootQ = this.find(q)

        // 本身就是连通的,不需要合并
        if (rootP === rootQ) return

        // 将 q 的父节点指向 p 的父节点
        this.parent[rootP] = rootQ
        // 两个 group 合并后，整体group 的数量就减少了 1 个
        this.group--
    }

    // 查找 node 节点的父亲,并进行路径压缩
    find(node) {
        if(this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node])
        }
        return this.parent[node]
    }

    // 判断 p 和 q 是否连通
    connected (p, q) {
        return this.find(p) === this.find(q)
    }

    // 返回图中有多少个连通分量（分组）
    count () {
        return this.group
    }
}