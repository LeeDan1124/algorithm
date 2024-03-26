function deepClone(value) {

}

const val = {
    a: '1',
    b: null,
    c: [1,2,[12,{c1:'2'}]],
    d: {
        d1:'1',
        d2:{
            d21: 1,
            d22: 2,
        },
    },
    [Symbol.s]: 'kkk',
    f: new Set([1,2,3]),
    g: new Map([[1,2]])
}
val.e = val

console.log(JSON.stringify(deepClone(val)), '---')




