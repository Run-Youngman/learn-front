早期commonjs规范，是node.js中所遵循的模块规范，约定，一个文件是一个模块，每个模块都有单独的作用域，通过module.exports导出成员，再通过
require函数载入模块，约定以同步方式加载模块，在node.js端启动时加载，但是浏览器中如果同步加载会引起大量的同步请求，导致运行效率低下。

Es modules 是ECMAScript2015[Es6]才定义的模块系统，遵循AMD[Asynchronous Module Definition]规范。比较新，所以会存在环境兼容的问题。webpack打包可以把es6代码转换成可以兼容大多环境的代码[es5]。

ES Module 规定了在只能在模块顶层 静态化的导入，所以可以在编译阶段就知道到底依赖了哪些模块，而commonjs则是动态的导入，只能在运行时得出是否依赖。
所以webpack打包不能支持commonjs,早前的babel-loader因为增强兼容性，会将一部分esm代码转成cjs。


入口文件，根据文件中的import(es modules)或者require(commonjs)解析以来的资源模块，然后再分别去解析每个资源的依赖。

devServer会将构建结果和输出文件全部作为开发服务器的资源文件，一般是可以通过copywebpack将文静态文件复制，但是考虑到开发过程中频繁执行打包任务，假设目录下文件多，开销就会大，所以一般都是上线前那一次打包会使用。 - 利用contentBase属性，可以让服务器读取到未被打包的静态文件。contentBase: 'public'.

开发模式下使用： cheap-module-eval-source-map 
1、需要调试Loader转换前代码；
2、一般每行代码不超过80个字符，定位到位置足够了
3、启动慢，但是大部分时间都是监视模式下重新打包，速度快。
生产环境下：none毋庸置疑。

热更新：
const webpack = require('webpack')
module.exports = {
  devServer: {
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
更新css可以热处理，但是js还会导致页面刷新，因为css的sytle-loader已经自动处理了样式文件的热更新，但是脚本因为导出的可能是对象、函数、字符串所以不知道如何处理更新后的模块。
vue-cli 或者create-react-app这些工具都实现了通用的替换操作，所以改动.vue可以实现热替换。、
自己实现的话，还是需要手动通过代码来处理如何完成更新热替换，以下图为例：

// ./src/main.js
import logo from './icon.png'
// ... 其他代码
module.hot.accept('./icon.png', () => {
  // 当 icon.png 更新后执行
  // 重写设置 src 会触发图片元素重新加载，从而局部更新图片
  img.src = logo
})


