// https://webpack.js.org/api/compiler-hooks/   
// https://webpack.js.org/api/compilation-hooks/    官方钩子
/*
Webpack要求插件必须是一个函数或者一个包含apply方法的对象。
*/
// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {  //该函数在 Webpack 启动时被调用，complier中包含了此次构建的所有配置信息
    // 通过查询api，这个叫做emit的钩子，会在webpack即将向输出目录输出文件时执行。
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()   // source可以获取文件内容
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '') // 正则替换注释内容
          compilation.assets[name] = { // 重写source方法和size方法
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}