// 保存着原始函数和被套用的参数的闭包来工作
function add() {
	var args = Array.prototype.slice.call(arguments);

	var _adder = function() {
		args.push(...arguments)
		return _adder
	}
	var _count = function () {
		return args.reduce(function (a,b) {
			return a + b;
		})
	}
	Object.defineProperty(add, '_adder',{
		value: _count()
	})
	_adder.toString = function () {
		for(var result = 0, i = 0, length = args.length; i < length; i++){
            result += args[i];
        }
        return result
	}
	
	return _adder;
}


console.log(add(1)(2)(3)(4))
alert(add(1)(2)(3)(4))


