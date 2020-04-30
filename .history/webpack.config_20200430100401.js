const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js', // 打包入口：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
  output: {
    path: path.resolve(__dirname, 'dist'), // 解析路径为./dist
    filename: 'bundle.js'
  }, // 出口
  resolve: {}, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
  devServer: {}, // 开发服务器：run dev/start 的配置，如端口、proxy等
  module: {}, // 模块配置：配置loader（处理非 JavaScript 文件，比如 less、sass、jsx、图片等等）等
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',  //配置输出文件名和路径
      template: './public/index.html', // 配置要被编译的html文件
      hash: true,
      // 压缩 => production 模式使用
      minify: {
        removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true //折叠 html 为一行
      }
    })
  ] // 插件的配置：打包优化、资源管理和注入环境变量
}