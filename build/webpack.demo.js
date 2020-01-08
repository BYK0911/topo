const base = require('./webpack.base');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(base, {
  mode: 'production',
  entry: {
    demo: path.resolve(__dirname, '../demo')
  }
})