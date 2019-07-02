/**
 * webpack 配置文件
 * webpack 打包会自动使用 webpack.config.js 作为其配置文件去打包
 * 将 webpack 配置规则写到一个对象中直接导出
 * 注意：该文件不会被打包，它是工具的配置文件
 * 注意：该文件基于 Node 运行，所以可以编写 Node 代码
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  /**
   * 打包的入口
   */
  entry: './src/main.js',

  plugins: [
    /**
     * 打包之前先清除 dist 目录
     */
    new CleanWebpackPlugin(),

    /**
     * 使用 html-webpack-plugin 打包 html 文件
     * 打包到哪里？它会将文件打包到 output.path 中，文件名不变
     * 并且自动引入打包的结果 JavaScript 文件
     */
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true // 去除回车换行空格
      }
    }),

    new webpack.HotModuleReplacementPlugin(),

    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ],

  /**
   * 打包的出口
   * path 打包的结果的存储目录，必须是绝对路径
   * filename 打包的结果文件名
   */
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  },

  /**
   * mode 打包模式，如果没有指定，默认使用 production 模式打包
   * development 开发模式打包，打包速度快，不会优化打包结果
   * production  生产模式打包，打包速度慢，会优化打包结果
   * 建议：开发使用 development，发布上线使用 production
   */
  mode: 'development',

  /**
   * 配置 Source Map  源代码地图导航，方便调试
   * inline-source-map 将源码映射内容生成到结果文件中
   */
  devtool: 'cheap-module-eval-source-map',

  /**
   * webpack-dev-server 配置项
   * 这个工具会启动一个 web 服务，并自动打包构建，它会将 contentBase 设置为 Web 服务的根目录
   * webpack-dev-server 为了提高打包效率，将打包的结果存储在内存中
   * 所以我们只是在开发的过程中使用 webpack-dev-server
   * 发布上线（生产）打包直接 npm run build 生成物理文件
   */
  devServer: {
    contentBase: './dist',
    open: false, // 是否自动打开浏览器访问网站地址
    port: 8080, // 占用的端口号
    hot: true
  },

  /**
   * 模块路径打包规则配置
   */
  resolve: {
    /**
     * 配置可以省略的文件模块后缀名
     */
    extensions: ['.js', '.vue', '.css', '.json'],

    /**
     * 路径别名，尽量使用绝对路径
     */
    alias: {
      '@': path.join(__dirname, './src')
    }
  },

  /**
   * 模块相关配置
   */
  module: {
    /**
     * 对不同的资源配置使用不同的 loader 加载器
     */
    rules: [
      /**
       * 当 test 匹配到以 .css 结尾的文件资源的时候 use css-loader 和 style-loader 处理
       * 首先它使用 css-loader 将 css 转为 JavaScript 模块，模块存储的就是 css 文件字符串
       * 然后使用 style-loader 生成一段代码：在运行期间，生成 style 节点，插入页面的 head 中
       * 注意：老外的思维的都是反的，后面的是先执行的，不要把 loader 的顺序配置错了
       */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      /**
       * 当匹配到以 /\.(png|jpg|gif)$/ 结尾的文件的使用，use 使用 file-loader 加载处理
       */
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },

      /**
       * 当匹配到以 /\.(woff|woff2|eot|ttf|otf)$/ 结尾的资源文件的时候，use 使用 file-loader 处理
       */
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          'file-loader'
        ]
      },

      /**
       * 当匹配到以 .less 结尾的资源的时候，分别使用下面的 loader 去处理
       */
      {
        test: /\.less$/,
        use: [
          'style-loader', // 3. 生成 style 节点插入 DOM
          'css-loader', // 2. 将 css 转为 JavaScript 模块
          'less-loader' // 1. 将 less 转为 css，less-loader 依赖了 less
        ]
      },

      /**
       * 当匹配到以 .js 资源的时候使用 babel-loader 将 JavaScript 中的 es6 代码转为 es5
       */
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/, // 排除第三方包
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 转换规则
            cacheDirectory: true // 开启缓存
          }
        }
      },

      /**
       * 当匹配到以 .vue 结尾的资源的时候，使用 vue-loader 处理
       */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
