const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  watch: true,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/src/index')
  ],
  output: {
    path: path.join(__dirname, 'client/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/public/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
        ]

      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      {
        test: /(\.css)$/,
        loader: ExtractTextPlugin.extract('css?sourceMap')
      },
      {
        test: /(\.scss)$/,
        loader: ExtractTextPlugin.extract('css?sourceMap')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      { test: /\.(woff|png|jpg|gif)$/, loader: 'url-loader?limit=250000' }
    ]
  },
  resolve: {
    extensions: ['', '.css', '.js', '.jsx']
  },
};
