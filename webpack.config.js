/*eslint-env node*/
module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      './js/main.jsx'
    ]
  },
  output: {
    path: 'js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
