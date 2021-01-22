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

