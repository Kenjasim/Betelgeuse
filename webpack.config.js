const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '!!html-loader!templates/index.html'
    })
  ],
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // query: {
        //    presets: ["es2015", "react"]
        // }
      },
      // { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  }
};
