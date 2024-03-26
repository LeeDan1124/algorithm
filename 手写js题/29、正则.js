let str = '2017-09-13'
let reg = /(\d+)(-)/g

str.replace(reg, ($0, $1, $2) => {
    // console.log($0)
    // console.log($1)
    // console.log($2)
})



let str1 = '$1,187,098.'
//  $18,935,785

let reg1 = /^\$(0|([1-9]\d{0,2}(,\d{3})*))(\.\d{2})?$/g
// console.log(reg1.test(str1))


let str2 = '    iii  iii    '
let reg2 = /^(\s*)(\S.*\S)(\s*)$/g
let reg3 = /(^\s*)|(\s*$)/g
let a = str2.replace(reg2, ($0, $1, $2, $3) => {
    return $2
})

let b = str2.replace(reg3, ($0, $1, $2) => {
    return ''
})
console.log(b, b.length, '=====')