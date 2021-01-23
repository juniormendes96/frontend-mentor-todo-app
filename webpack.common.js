const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main-bundle-[fullhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};
