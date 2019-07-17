 const path = require('path');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.jsx'
   },
   plugins: [
     // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'Production',
       template: '!!html-loader!templates/index.html'
     })
   ],
   output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
   },
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
        // exclude: /node_modules/,
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