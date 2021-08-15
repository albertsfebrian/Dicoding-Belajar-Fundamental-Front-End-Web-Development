const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // host: '192.168.100.100',
    port: 3000,
    contentBase: path.join(__dirname, 'public')
  }
})
