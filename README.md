# webpack4 实践
1. 建立webpack项目
- 初始化
  
```javascript
mkdir webpack-dev //创建webpack-dev目录
cd webpack-dev //进入webpack-dev目录
git init // 初始化git仓库
npm init // 初始化npm项目,生成package.json文件
```

2. webpack配置（可以看我的commit，每个步骤都有commit）
- webpack配置项目加载静态文件和css预处理器
  - 加载静态文件
  - less解释器
- 配置开发环境
  - 配置webpack-dev-server
  - 配置Html入口
  - 配置热重载和devtool
- 配置代码书写规范
  - 配置Eslint
  - 配置Stylelint
  - 配置githook和prettier
- 配置优化项
  - 配置CSS单独分离打包
  - 区分打包类库（框架）代码

# 参考文献
[eslint+husky+prettier+lint-staged提升前端应用质量](https://juejin.im/post/5c67fcaae51d457fcb4078c9)

[Webpack基本使用（详解）](https://juejin.im/post/5d2fd19be51d4576bc1a0eb0)

[理解 Gulp 和 Webpack](https://www.barretlee.com/blog/2017/04/27/gulp-and-webpack/)

[require.context](https://juejin.im/post/5ab8bcdb6fb9a028b77acdbd)

# 常见loader(loader的作用顺序是从后往前)

babel-loader ES6转ES5


style-loader css-loader 解析 css 并插入到模板 style 标签中


less-loader 解析less


file-loader url-loader 解析资源文件 图片、字体等


html-loader 解析 html 文件中的图片

# 常见plugin

html-webpack-plugin 生成模板文件把资源自动插入到模板中


clean-webpack-plugin 打包是清理上一次的打包文件


mini-css-extract-plugin css分离插件


optimize-css-assets-webpack-plugin css压缩插件


webpack.ProvidePlugin 自动加载模块


webpack.DefinePlugin 创建全局常量


SplitChunksPlugin 代码分割


webpack-bundle-analyzer 资源分析

# 理想的前端开发流程

1. 写业务逻辑代码（例如 es6，scss，pug 等）
2. 处理成浏览器认识的（js，css，html）
3. 浏览器自动刷新看到效果
4. 前端开发就是在不断的 123..123..123.... 循环中进行的，上面的后两步（也就是 2 和 3）应该是 自动化 的，前端开发者理应只需关注第 1 步——写业务逻辑代码。

# gulp vs webpack
1. Gulp 
   - 是一个任务管理工具，让简单的任务更清晰，让复杂的任务易于掌控；而 webpack 的理念是，一切皆为模块，每个模块在打包的时候都会经过一个叫做 loader 的东西，它具备非常强大的精细化管理能力，主要解决的是依赖分析问题。
   - Gulp 的学习，搞清楚 **gulp.src**, **gulp.dest**, **gulp.task**, **gulp.watch** 四个 API 就差不多了，它的底层原理是使用 Node 的 Transform Streams，这是一个可读可写可做中间转换的 Streams 管道，由于从 src 到 dest 过程中，文件一直停留在 Streams 中，没有落地成为实体文件，所以整体运作效率非常高。
2. webpack
   - Webpack 概念很多，但搞清楚 entry，output 和 loader 三个关键点，基本上就可以解决简单的问题了，稍微复杂的场景主要包括对资源的合并处理、分拆处理、多次打包等，部分这样的问题可以使用插件辅助解决，但是 Webpack 的强大并不在文件处理，而是依赖分析，所以在流程操作特别复杂的情况，webpack 并不能胜任工作，往往会被作为 gulp 的一个 task，整体工作流交给 gulp 主导。

# require.context

可以使用require.context()方法來创建自己的（模块）上下文，这个方法有3个参数
- 要搜索的文件夹目录
- 是否还应该搜索它的子目录
- 以及一个匹配文件的正则表达式
```javascript
  require.context("./test", false, /\.test\.js$/);
  //（创建了）一个包含了 test 文件夹（不包含子目录）下面的、所有文件名以 `.test.js` 结尾的、能被 require 请求到的文件的上下文。
```

导出的方法有3个属性，resolve,keys,id
- resolve 是一个函数，它返回请求被解析后得到的模块 id。
- keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
- id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到