浅拷贝： 如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象。
方法一：
let target = {}
let source = {a: {b:1}}
targetObject.assign(target, source) // 这样就完成了对source的浅拷贝

注意：
*它不会拷贝对象的继承属性；
*它不会拷贝对象的不可枚举的属性；
*可以拷贝 Symbol 类型的属性。
方法二：扩展运算符（效果同方法一）
let obj = {a:1,b:{c:1}}
let obj2 = {...obj}

方法三： concat 、 slice 拷贝数组

DIY：
const shallowClone = (target) => {
	if (typeof target === 'object' && target !== null) {
		const cloneTarget = Array.isArray(target) ? [] : {}
		for (let i in target) {
			if (target.hasOwnProperty(i)) { // for in 会遍历出一些继承来的属性
				cloneTarget[i] = target[i]
			}
		}
		return cloneTarget
	} else {
		return target
	}
}

深拷贝：对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。
方法一：JSON.stringfy
let obj1 = { a:1, b:[1,2,3] }
let str = JSON.stringify(obj1)；
let obj2 = JSON.parse(str)；

注意点：
* 对象的值中有函数，undefined , symbol,序列化之后键值对会消失；
* Date 引用类型会变成字符串；
* 无法拷贝不可枚举属性；
* 无法拷贝对象的原型链；
* 拷贝RegExp引用类型会变成空对象{}；
* 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
* 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。


function deepClone(obj) {
  let cloneObj = Array.isArray(obj) ? []: {};
  for(let key in obj) {
    if(typeof obj[key] ==='object') { 
      cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
    } else {
      cloneObj[key] = obj[key]  //基本类型的话直接复制值
    }
  }
  return cloneObj
}


1.这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；


2.这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；


3.对象的属性里面成环，即循环引用没有解决。

稍稍优于JSON.stringify
