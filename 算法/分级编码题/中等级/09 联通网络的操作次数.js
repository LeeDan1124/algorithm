/**
 * 
 *用以太网线缆将 n 台计算机连接成一个网络，计算机的编号从 0 到 n-1。线缆用 connections 表示，其中 connections[i] = [a, b] 连接了计算机 a 和 b。
网络中的任何一台计算机都可以通过网络直接或者间接访问同一个网络中其他任意一台计算机。

给你这个计算机网络的初始布线 connections，你可以拔开任意两台直连计算机之间的线缆，并用它连接一对未直连的计算机。请你计算并返回使所有计算机都连通所需的最少操作次数。如果不可能，则返回 -1 。 

输入格式:
第 1 行输入 n 和 m，分别表示计算机的个数和线缆个数，用空格分隔。接下来的 m 行输入，表示有线缆连接的计算机 a 和 b，用空格分隔。

输出格式:
对每一组输入，在一行中输出使所有计算机都连通所需的最少操作次数，如果不可能，则返回-1。
 */

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((n, index) => index);
    this.count = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  isContectted(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    return rootP === rootQ;
  }

  contect(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    if (rootP === rootQ) {
      return;
    }

    this.parent[rootP] = rootQ;

    this.count--;
  }
}

function minActions(nodeNum, line, connections) {
  if (line < nodeNum - 1) return -1;

  const uf = new UnionFind(nodeNum);
  connections.forEach((item) => {
    uf.contect(item[0], item[1]);
  });

  // 这里-1，是因为节点是n时，最小的联通分量是n-1，使给定的connections进行连接，每次链接成功后联通分量都会-1
  // 等所有的connection链接完后，uf.count就是目前的联通分量，只有再-1就是最少的需要再操作的次数
  return uf.count - 1;
}
