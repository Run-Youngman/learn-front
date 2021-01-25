new 关键字执行之后返回一个对象，如果构造函数返回一个对象，会覆盖原有的对象。
function Person() {
	this.name = 'Jack'
	return {age: 18}  // 必须是个对象，如果是其他不会覆盖
}
var p = new Person()
console.log(p) // {age: 18}

如果不使用 new 关键字，this指向的是window
function Person() {
	this.name = 'Jack'
}
var p = Person()
p // undefined
name // Jack

--------------------------------------------------------------------------------------------------------------------------
apply call bind 原理
“借用”  生活中我不经常做饭，家里没有锅，周末突然想给自己做个饭尝尝。但是家里没有锅，而我又不想出去买，
、所以就问隔壁邻居借了一个锅来用，这样做了饭，又节省了开销，一举两得。

应用
Object.prototype.toString.call(obj).replace(/^$/,'$1') 判断数据类型

let arr = [1,2,3]
let max = Math.max.apply(Math, arr) // 节省了一步展开数组的操作，因为Math.max不接收数组  Math.max(1,2,3)

function _new (constructor, ...args) {
	if (typeof constructor !== 'function') {
		throw 'constructor must be a function'
	}
	let obj = new Object()
	// obj.__proto__ = constructor.prototype; 可以覆盖属性，但不会影响原有构造函数
    obj.__proto__ = Object.create(constructor.prototype);
    // 执行一下构造函数
    let res = constructor.apply(obj, [...args])

    // 这里就算constructor返回一个创建的对象，比如new String('123') js也会认作object,所以不会有问题
    let isObject = typeof res === 'object' && res !== null
    let isFunction = typeof res === 'function'
    return isObject || isFunction ? res : obj
}

Function.prototype.call = function (context, ...args) {
	var context = context || window
	context.fn = this
    var result = eval('context.fn(...args)')
    delete context.fn
    return result
}

Function.prototype.bind = function (context, ...args) {
	if (typeof this !== 'function') {
		throw new Error("this must be a function");
	}
	var self = this;
	var fbound = function () {
		// 这里采用这种写法，是因为防止一些特殊的调用方式，比如new 这种调用方式会返回一个连接到该函数的全新对象
		// 此时调用方法bind的硬绑定操作，从定义上来讲，是支持通过new 操作符来分配新对象的
		// 如果不这样判断，而是直接使用context,会导致下方例子中baz.a的输出为undefined,即new操作符并没有给新对象赋值
		// 而是一味的只给绑定的对象赋值
		self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)))
	}
	// 一些情况下会导致prototype缺失
	if (this.prototype) {
		fbound.prototype = Object.create(this.prototype)
	}
	return fbound;
}

function foo(something) {
  this.a = something
}
 
var obj1 = {};
 
var bar = foo.bind(obj1);
bar(2);
 
console.log(obj1.a);  // 2
 
var baz = new bar(3);
console.log(obj1.a);  //2
console.log(baz.a);  //3
 