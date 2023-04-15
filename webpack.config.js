const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    // index: ['babel-polyfill', 'src/index.js'],
    main: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'webpack_build/'),
    // publicPath: "/",
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'src/assets')],
        use: 'svg-inline-loader',
      },
      {
        test: /\.css$/i,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    new Dotenv({
      path: './.env',
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, 'public/index.html'), // шаблон
      path: path.resolve(__dirname, 'webpack_build'),
      filename: 'index.html', // название выходного файла
    }),
  ],
  mode: 'development',
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    port: 3000,
    // сообщим dev-серверу, что в проекте используется hmr
    hot: true,
  },
};
