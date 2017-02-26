const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // client: './ui/editor.ejs'
  },
  // externals: {
  //   react: "React"
  // },
  output: {
    filename: 'js/[name].js',
    path: './hosted/'
  },
  module: {
    loaders: [
      // Style
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract([ 'css?-minimize', 'sass' ]) },

      // This may need some atention when js files are being included from node_modules
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: [ 'es2015' ] } },

      // React specific javascript
      { test: /\.jsx?/, loader: 'babel', query: { presets:[ 'react', 'es2015' ] } },

      // HTML Files
      { test: /\.html$/, loader: 'html' }
    ]
  },
  plugins: [
    // First destroy the existing dist folder
    new CleanWebpackPlugin(['./hosted/*']),

    // Compress JS files
    new webpack.optimize.UglifyJsPlugin(),

    // Set export path for generated style sheets
    new ExtractTextPlugin('./style/[name].css'),

    // Build HTML
    new HtmlWebpackPlugin(Object.assign(
      { filename: './editor.html', template: './ui/editor.ejs' }
    )),

    // Copy static assets over
    new CopyWebpackPlugin([
    ])
  ],
  sassLoader: {
    includePaths: [],
    outputStyle: 'expanded'
  }
};
