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
    Object.setPrototypeOf(instance, this);
    Object.setPrototypeOf(this.__proto__, instance.__proto__.prototype);
    // this.__proto__ = Cat;
    // instance.__proto__ = this;
    return instance;
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

/*
评分重点：
1. 根据 dogInstance intanceof Dog / Mouse / Cat 可以推断出，这三者原型链有继承关系
2. 根据 print 顺序 cat → mouse → dog，得到继承关系为 Dog 继承 Mouse，Mouse 继承 Cat [ 0-2 ]
3. 根据 let dogInstance = new Dog(); 和 class Dog extends Cat 得到 Dog 继承 Cat
4. 补全代码需要打断已有原型链，并加入 Mouse 的继承关系 [ 0-5 ]
5. 其他 [ 0-3 ]
*/

class Mouse1 {
  constructor(instance) {
    // 补全代码
    let superProto = instance.__proto__.__proto__;

    // 核心考点原型链继承
    Object.setPrototypeOf(instance.__proto__, this.__proto__);
    Object.setPrototypeOf(instance.__proto__.__proto__, superProto);
    // 或
    // instance.__proto__.__proto__ = this.__proto__;
    // instance.__proto__.__proto__.__proto__ = superProto;

    return instance;
  }
  print() {
    super.print();
    console.log("This is a mouse.");
  }
}
