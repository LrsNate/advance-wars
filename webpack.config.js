const path = require('path');
const webpack = require('webpack'); // eslint-disable-line

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['lodash'],
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    enforceExtension: false,
    plugins: [
      new CopyWebpackPlugin([
        { from: 'index.html' },
      ]),
    ],
  },
};
