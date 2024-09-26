/**
 有 n 个人前来排队买票，其中第 0 人站在队伍 最前方 ，第 (n - 1) 人站在队伍 最后方 。
给你一个下标从 0 开始的整数数组 tickets ，数组长度为 n ，其中第 i 人想要购买的票数为 tickets[i] 。
每个人买票都需要用掉 恰好 1 秒 。一个人 一次只能买一张票 ，如果需要购买更多票，他必须走到  队尾 重新排队（瞬间 发生，不计时间）。如果一个人没有剩下需要买的票，那他将会 离开 队伍。
返回位于位置 k（下标从 0 开始）的人完成买票需要的时间（以秒为单位）。

https://leetcode.cn/problems/time-needed-to-buy-tickets/description/
 */
function getTime(tickets, k) {
  // 队列
  const queue = new Array(tickets.length).fill().map((x, index) => index);

  // 队列里的人剩余要购买的票
  const remianTickets = [...tickets];
  let totalTime = 0;
  // console.log(tickets, k, queue, remianTickets)
  while (queue.length) {
    const curK = queue.shift();
    let curKTikcets = remianTickets.shift();
    curKTikcets--;
    totalTime++;

    // 如果是要找的这个人，并且他买完了，返回他买票用的时间
    if (curK === k && curKTikcets === 0) {
      return totalTime;
    }

    // 如果当前这个人还有票需要买，那他去队尾重新排队, 否则的话，从队列里去除
    if (curKTikcets) {
      queue.push(curK);
      remianTickets.push(curKTikcets);
    }
  }
}

console.log(getTime([2,3,2], 2))