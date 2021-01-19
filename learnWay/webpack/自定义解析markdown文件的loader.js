/*
每个webpack 的 loader都需要导出一个函数，这个函数就是对资源的处理过程，输入是资源内容，输出是加工后的结果。
*/
一个资源文件可以多个loader来处理，但是最终输出结果必须是一段标准的js代码，因为最终的结果会被放到一个函数中.
(function(module, exports) {
  // the final output
})
所以解决方案有两种：
1、直接在这个 Loader 的最后返回一段 JS 代码字符串；
2、再找一个合适的加载器，在后面接着处理我们这里得到的结果。

方法一：
const marked = require('marked') // 解析markdown->html的依赖

module.exports = source => {
  const html = marked(source)
  const code = `export default ${JSON.stringify(html)}`  // 避免html中换行和引号产生语法错误
  return code 
}

方法二：
const marked = require('marked')
module.exports = source => {
  const html = marked(source)
  return html
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',  // 使用方法二，还需要使用html-loader对内容进行转换
          './markdown-loader'
        ]
      }
    ]
  }
}