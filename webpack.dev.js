const { merge } = require('webpack-merge');
const prod = require('./webpack.prod');

module.exports = merge(prod, {
  mode: 'development',
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true,
    port: 3000
  },
  devtool: 'inline-source-map'
});
