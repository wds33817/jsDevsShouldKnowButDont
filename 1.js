/* bad practice
const you = {
  talk() {
    return 'Talking';
  }
}
  */

class Person {
  talk() {
    return 'Talking';
  }
}

const me = new Person();
const you = new Person();

console.log(me.talk());
console.log(you.talk());
// __proto__ is for instance
// prototype is for class
//me.__proto__.age=13 // will write into Person.prototype age
/*
Person.prototype === me.__proto__;
true
*/

// how to improve the prototype function in Person?
Person.prototype.talk = function () {
  return 'New and improved';
};

function Person1() {
  this.study = function () {
    return 'Studying';
  };
}
const me1 = new Person1();
//study method will be me's method rather than Person1's prototype method

function Person2() {
  this.age = 12;
}

const me2 = new Person2();
Person2.age = 44;
me; // still age 12

function Person3(age, name, gender) {
  this.age = age;
  this.name = name;
  this.gender = gender;
}

Person3.prototype.run = function () {};

Person3.prototype.talk = function () {};

class Person4 {
  talk() {
    return 'Talking';
  }
}
const me4 = new Person4();
me4.talk();

class SuperHuman extends Person4 {
  fly() {
    return 'Flying';
  }
}

const you1 = new SuperHuman();
you1.fly();
you1.talk();

const Person6 = {
  talk() {
    return 'Talking';
  },
};

const me6 = Object.create(Person6);
me6;

const Person7 = {
  talk() {
    return 'Talking7';
  },
};
const me7 = {};
Object.setPrototypeOf(me7, Person7);

/*
在 JavaScript 中，继承主要通过**原型链（prototype chain）**来实现，也可以使用现代的 **class 语法**来简化面向对象编程中的继承。以下是实现继承的几种方式：

### 1. 基于原型的继承

JavaScript 使用原型链实现继承。每个对象都有一个内部属性 `[[Prototype]]`（可以通过 `__proto__` 访问），这个属性指向另一个对象（称为原型），该原型对象可以包含该对象可以继承的属性和方法。

#### 示例：通过原型实现继承
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a noise.`;
};

function Dog(name, breed) {
  Animal.call(this, name); // 调用父构造函数
  this.breed = breed;
}

// 设置 Dog 的原型为 Animal 的实例
Dog.prototype = Object.create(Animal.prototype);
// 确保构造函数属性指向 Dog
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks.`;
};

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.speak()); // Buddy makes a noise.
console.log(myDog.bark());  // Buddy barks.
```

在这个示例中：
- `Animal` 是一个父类，它定义了一个方法 `speak`。
- `Dog` 是一个子类，通过调用 `Animal.call` 继承了 `Animal` 的属性。
- `Dog.prototype = Object.create(Animal.prototype)` 创建了一个新的对象，继承自 `Animal.prototype`。
- `Dog.prototype.constructor` 被重置为 `Dog`，以确保构造函数属性的正确性。

### 2. 使用 ES6 的 `class` 语法

ES6 引入了 `class` 语法，使继承的实现更加直观和易于理解。使用 `class` 和 `extends` 关键字可以简化继承过程。

#### 示例：使用 `class` 语法实现继承
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类的构造函数
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks.`;
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.speak()); // Buddy makes a noise.
console.log(myDog.bark());  // Buddy barks.
```

在这个示例中：
- `Animal` 定义为一个父类，包含一个 `speak` 方法。
- `Dog` 使用 `extends` 关键字继承自 `Animal`，并且使用 `super` 调用父类的构造函数。

### 3. 组合继承

组合继承是一种结合构造函数继承和原型继承的方式，通常用来确保每个实例都有独立的属性，同时又能共享原型方法。

#### 示例：组合继承
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a noise.`;
};

function Dog(name, breed) {
  Animal.call(this, name); // 继承属性
  this.breed = breed;
}

Dog.prototype = new Animal(); // 继承方法
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks.`;
};

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.speak()); // Buddy makes a noise.
console.log(myDog.bark());  // Buddy barks.
```

通过这些方式，JavaScript 可以实现灵活的继承机制，支持面向对象编程中的继承概念。



在这个例子中，可以通过以下几个关键点来看出 `Dog` 是 `Animal` 的子类：

### 1. **调用父类构造函数 (`Animal.call(this, name)`)**：
   - 在 `Dog` 构造函数中，使用 `Animal.call(this, name)` 来调用父类 `Animal` 的构造函数。这一步使得 `Animal` 构造函数中的属性（如 `name`）可以在 `Dog` 实例中被初始化。
   - `call` 方法将 `this` 绑定到当前的 `Dog` 实例上，意味着 `name` 属性将被添加到 `Dog` 对象上，而不是 `Animal` 对象上。

### 2. **设置原型链 (`Dog.prototype = Object.create(Animal.prototype)`)**：
   - `Dog.prototype = Object.create(Animal.prototype)` 这行代码创建了一个新对象，它的原型（`__proto__`）指向 `Animal.prototype`，并将这个新对象赋值给 `Dog.prototype`。
   - 这一步建立了原型链，使得 `Dog` 的实例可以继承 `Animal` 原型上的方法（如 `speak` 方法）。
   - 当调用 `myDog.speak()` 时，JavaScript 会在 `myDog` 实例上查找 `speak` 方法，如果没有找到，会沿着原型链查找 `Animal.prototype`，因此能够访问 `speak` 方法。

### 3. **重置构造函数引用 (`Dog.prototype.constructor = Dog`)**：
   - `Dog.prototype.constructor = Dog` 这行代码确保了 `Dog` 的构造函数属性指向 `Dog` 本身，而不是 `Animal`。
   - 这是为了保持对象的构造函数引用一致，方便在以后检查对象类型时不会出现混淆。

### 4. **方法定义在子类原型上 (`Dog.prototype.bark = function() {...}`)**：
   - `bark` 方法是定义在 `Dog.prototype` 上的，是 `Dog` 类特有的行为。通过将特有方法添加到 `Dog` 的原型上，可以区分 `Dog` 和 `Animal`。

### 总结：`Dog` 是 `Animal` 的子类，因为：
- 通过 `Animal.call` 继承了 `Animal` 构造函数的属性。
- 通过设置原型链 (`Dog.prototype = Object.create(Animal.prototype)`) 继承了 `Animal` 的方法。
- 重置了构造函数引用，确保类型检查一致性。

这些步骤组合起来，使得 `Dog` 实例既可以使用从 `Animal` 继承来的方法（如 `speak`），也可以使用它自己的方法（如 `bark`），从而实现子类的功能扩展。
*/

/* 闭包 */
function createCounter() {
  let count = 0; // 局部变量

  return function () {
    count += 1; // 闭包访问外部函数的局部变量
    return count;
  };
}

const counter = createCounter(); // 调用 createCounter，返回一个闭包

console.log(counter()); // 输出: 1
console.log(counter()); // 输出: 2
console.log(counter()); // 输出: 3
