const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode,
  entry: {
    main: path.resolve(__dirname, './src/app/index.js'),
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  devServer: {
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin()    
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpe?g|gif|svg|webp|ico)$/i, type: mode === 'production' ? 'asset' : 'asset/resource' },
      { test: /\.(mp3|wav|ogg)$/i, type: mode === 'production' ? 'asset' : 'asset/resource' },
      { test: /\.(woff2?|eot|ttf|otf)$/i, type: 'asset/resource' },
    ],
  },
};
