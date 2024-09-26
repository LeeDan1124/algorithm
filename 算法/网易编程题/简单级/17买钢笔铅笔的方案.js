/**
 * @param {number} amount
 * @param {number} penUnit
 * @param {number} pencelUnit
 * @return {number}
 */
var waysToBuyPensPencils = function (amount, penUnit, pencelUnit) {
    let cases = 0
    // x 为买钢笔的数量, y为当买 x 支钢笔时，可购买铅笔的最多数量
    for (let i = 0; i * penUnit <= amount; i++) {
        const y = (amount - penUnit * i) / pencelUnit
        if (y < 1) break
        cases += y + 1
    }
    return cases
};

console.log('👳‍♀️', waysToBuyPensPencils(5, 10, 10))