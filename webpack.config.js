/**
 * webpack 配置文件
 * webpack 打包会自动使用 webpack.config.js 作为其配置文件去打包
 * 将 webpack 配置规则写到一个对象中直接导出
 * 注意：该文件不会被打包，它是工具的配置文件
 * 注意：该文件基于 Node 运行，所以可以编写 Node 代码
 */
const path = require('path')

module.exports = {
  /**
   * 打包的入口
   */
  entry: './src/index.js',

  /**
   * 打包的出口
   * path 打包的结果的存储目录，必须是绝对路径
   * filename 打包的结果文件名
   */
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  }
}
