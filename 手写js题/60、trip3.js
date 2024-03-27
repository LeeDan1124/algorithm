/**
 * 代码补全
 */

class Cat {
  constructor() {}
  print() {
    console.log("This is a cat.");
  }
}
 
class Dog extends Cat {
  constructor() {
    super();
  }
  print() {
    super.print();
    console.log("This is a dog.");
  }
}
 
class Mouse {
  constructor(instance) {
    // 补全代码
  }
  print() {
    super.print();
    console.log("This is a mouse.");
  }
}
 
let dogInstance = new Dog();
dogInstance = new Mouse(dogInstance);
dogInstance.print();
console.log("dogInstance intanceof Cat:", dogInstance instanceof Cat);
console.log("dogInstance intanceof Mouse:", dogInstance instanceof Mouse);
console.log("dogInstance intanceof Dog:", dogInstance instanceof Dog);
 
/* 输出如下: */
/*
This is a cat.
This is a mouse.
This is a dog.
dogInstance intanceof Cat: true
dogInstance intanceof Mouse: true
dogInstance intanceof Dog: true
*/