const arr = [
    [ 1, 2, [3,4,5], [6,7,8]], 
    45,
    34,
    23, 
    '23',
    [34, 23, 90,['fdsf', ['safds', ['scd']]]]
]

function flat(arr) {
    if (!Array.isArray(arr)) {
        return Error('请输入数组')
    }
    const res = []

    arr.forEach(item => {
        if (!Array.isArray(item)) {
            res.push(item)
        } else {
            res.push(...flat(item))
        }
    })

    return res
}

console.log(flat(arr))