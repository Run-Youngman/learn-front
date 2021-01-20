数据类型：undefined null boolean string number Symbol BigInt Object[Array,EegExp,Date,Function]

typeof: 可以准确的判断typeof 不为'object'类型的数据[Symbols\Undefined\number\string\boolean]。

正常使用：
typeof 37 === 'number'
typeof NaN === 'number'


例外：typeof null === 'object'

错误：
typeof new String('abc') === 'object'  // 但是应该为String类型
************************************************************************************************************

instanceof: 可以准确判断复杂引用的数据类型，但是不能正确判断基础数据类型
语法： object instanceof constructor
let Car = function() {}
let benz = new Car()
benz instanceof Car // true
let car = new String('Mercedes Benz')
car instanceof String // true
let str = 'Covid-19'
str instanceof String // false，但是str真的是'String'数据类型

***************************************************************************************************************
getPrototype:   向上一层一层扒原型链
const prototype1 = {};
const object1 = Object.create(prototype1);
const object2 = Object.create(object1);

console.log(Object.getPrototypeOf(object1) === prototype1);  // true
console.log(Object.getPrototypeOf(object2) === prototype1)  // false
console.log(Object.getPrototypeOf(object2) === object1)  // true
console.log(Object.getPrototypeOf(Object.getPrototypeOf(object2)) === prototype1) // true
**************************************************************************************************************

利用 toString 最佳实践：
 function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');  // 注意正则中间有个空格
}
/* 代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下 */
getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回