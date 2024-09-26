/**
 * https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c/submissions/567913181/
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
    let resCount = 0
    // 把 a/b/c都转换为二进制
    let aT = a.toString(2)
    let bT = b.toString(2)
    let cT = c.toString(2)
    const maxLen = Math.max(aT.length, Math.max(bT.length, cT.length))
    aT = aT.padStart(maxLen, 0)
    bT = bT.padStart(maxLen, 0)
    cT = cT.padStart(maxLen, 0)

    for (let i = 0; i < maxLen; i++) {
        const curA = +aT[i]
        const curB = +bT[i]
        const curC = +cT[i]

        if ((curA | curB) === curC) {
            continue
        }
        if (curC === 0) {
            if (curA === 1) {
                resCount++
            }
            if (curB === 1) {
                resCount++
            }
        }
        if (curC === 1) {
            resCount++
        }
    }
    return resCount
};
console.log('😂', minFlips(2, 6, 5));