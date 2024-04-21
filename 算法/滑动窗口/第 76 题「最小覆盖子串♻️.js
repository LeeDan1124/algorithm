/**
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。
示例 1：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
示例 2：

输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。
示例 3:

输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。 
*/

function getStr(s, t) {
    if (!s || !t || typeof s !== 'string' || typeof t !== 'string' || s.length < t.length) return ''

    const targetObj = t.split('').reduce((pre, cur) => {
        if (typeof pre[cur] !== 'number') {
            pre[cur] = 0
        }
        pre[cur] = pre[cur] + 1
        return pre
    }, {})
    const targetNumber = Object.keys(targetObj).length  // 目标字符不同字符的个数 a: 1  b:2  c:3

    let left = 0, right = 0, curObj = {}, curNumber = 0, minStr = ''

    while(right <= s.length - 1) {
        const curS = s[right]
        if (t.includes(curS)) {

            if (!curObj[curS]) {
                curObj[curS] = 0
            }
            curObj[curS] = curObj[curS] + 1
            if (curObj[curS] === targetObj[curS]) {
                curNumber++
            }

            // 🍊 这里收缩左窗口时，只要把上一次的某个值挪出窗口就行，当下一次满足条件时，会收缩至最少区间
            while(curNumber === targetNumber && left <= right) {
                minStr = minStr.length === 0 ? s.substring(left, right + 1) : right - left + 1 < minStr.length ? s.substring(left, right + 1) : minStr

                const ls = s[left]
                if (t.includes(ls)) {
                    // 🍉 这里要先curNumber--再更新curObj
                    if (curObj[ls] === targetObj[ls]) {
                        curNumber--
                    }
                    curObj[ls] = curObj[ls] - 1
                }
                left++
            }
        } 
        right++
    }
    return minStr
}

console.log(getStr('ADOBECA', 'ABC'))



// labuladong的
var minWindow = function(s, t) {
    // 哈希表 need 记录需要匹配的字符及对应的出现次数
    // 哈希表 window 记录窗口中满足 need 条件的字符及其出现次数
    let need = new Map();
    let window = new Map();
    for (let i = 0; i < t.length; i++) {
        if (need.has(t[i])) {
            need.set(t[i], need.get(t[i]) + 1);
        } else {
            need.set(t[i], 1);
        }
    }
    let left = 0, right = 0;
    let valid = 0;
    // 记录最小覆盖子串的起始索引及长度
    let start = 0, len = Infinity;
    while (right < s.length) {
        // c 是将移入窗口的字符
        let c = s[right];
        // 扩大窗口
        right++;
        // 进行窗口内数据的一系列更新
        if (need.has(c)) {
            if (window.has(c)) {
                window.set(c, window.get(c) + 1);
            } else {
                window.set(c, 1);
            }
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }
        // 判断左侧窗口是否要收缩
        while (valid === need.size) {
            // 在这里更新最小覆盖子串
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            // d 是将移出窗口的字符
            let d = s[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }
    // 返回最小覆盖子串
    return len === Infinity ? '' : s.substr(start, len);
};
// console.log(minWindow('ADOBECODEBANC', 'ABC'))
