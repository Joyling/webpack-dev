const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: './src/index.js', // 打包入口：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
  output: {
    path: path.resolve(__dirname, 'dist'), // 解析路径为./dist
    filename: '[name].[hash:8].js'
  }, // 出口
  // 配置开发服务器
  // 开发服务器：run dev/start 的配置，如端口、proxy等
  // webpack-dev-server 是 webpack 官方提供的一个工具，可以基于当前的 webpack 构建配置快速启动一个静态服务。
  // 当 mode 为 development 时，会具备 hot reload 的功能，即当源码文件变化时，会即时更新当前页面，以便你看到最新的效果
  devServer: {
    overlay: true,
    port: 1234,
    open: true, // 自动打开浏览器
    compress: true, // 服务器压缩
    quiet: true, // 如果使用webpack-dev-server，需要设为true，禁止显示devServer的console信息
    //... proxy、hot
  },
  resolve: {
    /**
     * alias: 别名的配置
     *
     * extensions: 自动解析确定的扩展,
     *    比如 import 'xxx/theme.css' 可以在extensions 中添加 '.css'， 引入方式则为 import 'xxx/theme'
     *    @default ['.wasm', '.mjs', '.js', '.json']
     *
     * modules 告诉 webpack 解析模块时应该搜索的目录
     *   如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
     *   这样配置在某种程度上可以简化模块的查找，提升构建速度 @default node_modules 优先
     */
    alias: {
      //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
      'vue$':'vue/dist/vue.esm.js',// 'vue/dist/vue.common.js'
      '@': path.resolve(__dirname, 'src'),
      tool$: path.resolve(__dirname, 'src/utils/tool.js') // 给定对象的键后的末尾添加 $，以表示精准匹配
    },
     //引入路径是不用写对应的后缀名
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.vue'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
  module: {
     /**
     * test: 匹配特定条件。一般是提供一个正则表达式或正则表达式的数组
     * include: 匹配特定条件。一般是提供一个字符串或者字符串数组
     * exclude: 排除特定条件
     * and: 必须匹配数组中的所有条件
     * or: 匹配数组中任何一个条件,
     * nor: 必须排除这个条件
     */
    rules: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')] // 添加css中的浏览器前缀
            }
          },
          'less-loader'
        ]
      },
      // file-loader: 可以用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回。
      // url-loader:
      // 如果图片较多，会发很多 http 请求，会降低页面性能。url-loader 会将引入的图片编码，生成 dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此 url-loader 提供了一个 limit 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还会使用 file-loader 进行 copy。

      // url-loader 可以看作是增强版的 file-loader。
      // url-loader 把图片编码成 base64 格式写进页面，从而减少服务器请求。
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images/', //输出到images文件夹
              limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader'
        },
        {
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        },
        ]
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
        //这一个loader当然是vue项目必须的加载器啦，不加其他规则的话，
        //简单的这样引入就可以了，vue-loader会把vue单文件直接转成js。
      },]
  }, 
  // 模块配置：配置loader（处理非 JavaScript 文件，比如 less、sass、jsx、图片等等）等
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
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    }),
    new CleanWebpackPlugin(),
     // 请确保引入这个插件！这个插件是必须的！ 
     // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
     new VueLoaderPlugin(),
     // 管理输出-优化日志插件
  ], // 插件的配置：打包优化、资源管理和注入环境变量
  // 假如你 a.js 和 b.js 都 import 了 c.js 文件，这段代码就冗杂了。为什么要提取公共代码，简单来说，就是减少代码冗余，提高加载速度。
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // 抽离自己写的公共代码
          chunks: 'initial',
          name: 'common', // 打包后的文件名，任意命名
          minChunks: 2, //最小引用2次
          minSize: 0 // 只要超出0字节就生成一个新包
        },
        styles: {
          name: 'styles', // 抽离公用样式
          test: /\.css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true
        },
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        }
      }
    }
  }
}