如果函数前面带上new 来调用，背地里将会创建一个连接到该函数的prototype成员的新对象，同时this会绑定到这个新对象上。
1、 prototype
function Parent() {
	this.name = 'name'
	this.play = [1,2,3]
}

function Child() {
	this.type = 'child'
}

Child.prototype = new Parent()

var c1 = new Child()
var c2 = new Child()

c1.play.push(4)  // 此时c2.play [1,2,3,4]

两个实例使用的是同一个原型对象,会产生联动变化的问题。
----------------------------------------------------------------------------------------------------------------------
2、 构造函数继承
function Parent() {
	this.name = 'name'
	this.play = [1,2,3]
}
Parent1.prototype.getName = function () {}
function Child() {
	Parent.call(this)  // 不会出现全局污染的情况了
	this.type = 'child'
}

let child = new Child()
child.getName()  // 报错，not defined

解决了全局属性污染的问题，但是原型链上的方法没办法继承过来。
----------------------------------------------------------------------------------------------------------------------
3、组合继承（组合）需要调用两次Parent不好
function Parent() {
  this.name = 'name'
  this.play = [1,2,3]
}
Parent.prototype.getName = function () {}
function Child() {
  // 第二次调用
  Parent.call(this)
  this.type = 'child'
}
console.log(Child.prototype.constructor)
// 第一次调用
Child.prototype = new Parent()
// 挂载构造器,因为前面改变了prototype,所以需要重新挂载,虽然不影响大部分情况，不排除一些特殊情况。
console.log(Child.prototype.constructor)
Child.prototype.constructor = Child;
let child = new Child()
let child2 = new Child()
child.name = 'pp'
console.log(child2.name,child.name)
child.getName()  
----------------------------------------------------------------------------------------------------------------------
4、Object.create()  实现浅拷贝来复制对象,涉及到引用的部分修改仍会有问题。
let parent {
	name : 'name'
	play : [1,2,3],
	getName: function() {
		return this.name
	}
}

let child = Object.create(parent)
let child2 = Object.create(parent)

child.play.push(4)  // 此时child2.play [1,2,3,4]
----------------------------------------------------------------------------------------------------------------------
5、最优，在3的基础上优化执行两次构造函数
function Parent() {
	this.name = 'name'
	this.play = [1,2,3]
}
Parent.prototype.getName = function () {return this.name}

function Child() {
	Parent.call(this)
	this.friends = 'xiaoming'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = child;
let person = new Child();
----------------------------------------------------------------------------------------------------------------------
6、 ES6 extends
class Person {
	constructor(name) {
		this.name = name;
	}
	getName = function () {
		console.log('Person', this.name)
	}
}

class Gamer extends Person {
	constructor (name, age) {
		super(name)
		this.age = age;
	}
}

const asuna = new Gamer('Asuna', 20)
asuna.getName();

