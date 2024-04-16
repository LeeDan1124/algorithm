// es6的继承
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

// 编译成es5后的最终结果
function Cat() {}
Cat.prototype.print = function () {
  console.log("cat");
};

function Dog() {
  Cat.call(this);
}
Dog.prototype = Object.create(Cat.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.print = function () {
  Cat.prototype.print.call(this);
  console.log("dog");
};
