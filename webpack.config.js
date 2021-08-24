const path = require('path');

module.exports = {
  mode: 'development',

  context: path.resolve(__dirname, 'src/client'),

  entry: {
    exercice1: './exercice1.js',
    exercice2: './exercice2.js',
  },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist/static'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devtool: 'inline-source-map',
};
