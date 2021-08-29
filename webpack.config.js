const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  context: path.resolve(__dirname, 'src/client'),

  entry: {
    exercice1: './exercice1.js',
    exercice2: './exercice2.js',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  devtool: 'inline-source-map',
};
