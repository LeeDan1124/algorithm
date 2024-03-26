const instance1 = SingleIntance.getIntance()
const instance2 = SingleIntance.getIntance()
console.log(instance1, instance2, instance1 === instance2)