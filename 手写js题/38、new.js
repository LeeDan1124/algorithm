function myNew(Fun, ...args) {
}

function Person (name, age) {
    this.FullName = name
    this.age = age
    // return {
    //     FullName: 'defaultName',
    //     age: 30
    // }
}

let a = myNew(Person, 'lidan', 27)

console.log(a.FullName, '=====')
console.log(a.age, '-----')