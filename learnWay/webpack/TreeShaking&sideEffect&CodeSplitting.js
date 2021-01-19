生产模式下会自动开启Treeshaking和sideEffects.
TreeShaking: 消除无用代码。

module.exports = {
	optimization: {
		usedExports: true,       			// bundle.js中还会有声明式的内容，但是不会在bundle.js中被导出了
		minimize: true,          			// 压缩输出结果，将未被导出的声明式内容去除
    	concatenateModules: true,			// 尽可能合并每一个模块到一个函数中，原理是作用域提升，因为如果模块很多，输出结果中会有很多的模块函数，降低效率，增大体积

	}
}
困境：为js模块配置babel-loader，导致Tree-shaking失效。但是在babel-loader 8.X已经解决了这一问题。
ES Module 规定了在只能在模块顶层 静态化的导入，所以可以在编译阶段就知道到底依赖了哪些模块，而commonjs则是动态的导入，只能在运行时得出是否依赖。
所以webpack不能支持commonjs,早前的babel-loader因为增强兼容性，会将一部分esm代码转成cjs。
特别注意：import也能动态化的引入，比如 if(a) {import('123.js').then(){}} 但是只有在顶部的import 可以编译时优化。

sideEffects: 通过在package.json中配置标识代码是否有副作用，提供更大的压缩空间

Code Splitting:将资源模块按照规则打包到不同的bundle中，降低启动成本，提高速度。
Web 应用中的资源受环境所限，太大不行，太碎更不行。
HTTP 1.1的缺陷：
1、同一域名下并行请求有限制；
2、每次请求都会有一定的延迟；
3、每次请求除了传输内容，还有额外的请求头，大量请求的情况下，请求头加在一起也会浪费流量和带宽。

分包有两种实现：
1、根据业务不同配置多个打包入口，输出多个打包结果【多页面应用】；
2、结合ES Modules 的动态导入（Dynamic Imports），按需加载模块； 只要按照es modules动态导入方式，webpack会自动处理分包和按需加载。

webpack4 新增 production模式下，内部开启了很多通用的优化功能；
Define Plugin：注入全局成员，process.env.NODE_ENV。
Mini CSS Extract Plugin : 将css代码从打包结果中提取出来，样式文件独立存放，通过<link>标签引入页面。
Optimize CSS Assets Webpack Plugin： 将独立存放的样式文件进行压缩，webpack内置的插件仅仅针对js文件进行压缩。