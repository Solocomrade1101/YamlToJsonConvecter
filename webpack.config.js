const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlFiles = [
  { filename: 'fullScreen.html', chunks: ['fullScreen', 'fullScreenStyle'] },
  { filename: 'hello.html', chunks: ['hello', 'helloStyle'] },
  { filename: 'popup.html', chunks: ['popup', 'popupStyle'] },
];

const htmlPlugins = htmlFiles.map(file => new HtmlWebpackPlugin({
  template: `./src/html/${file.filename}`,
  filename: `html/${file.filename}`,
  chunks: file.chunks,
  minify: false,
}));

module.exports = {
  entry: {
    // Указываем все входные точки для файлов в src/js
    background: './src/js/background.js',
    popup: './src/js/popup.js', // Добавьте остальные файлы по аналогии
    fullScreen: './src/js/fullScreen.js',
    hello: './src/js/hello.js',

    fullScreenStyle: './src/scss/fullScreen.scss',
    helloStyle: './src/scss/hello.scss',
    popupStyle: './src/scss/popup.scss',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
  },
  mode: 'development',
  devtool: false, // Отключаем генерацию карт исходников
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false // Отключаем извлечение комментариев (лицензий)
      }),
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              // Возможно, нужно добавить плагин для предотвращения использования eval
              '@babel/plugin-transform-runtime'
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ],
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/_locales', to: '_locales' },
        { from: 'src/manifest.json', to: 'manifest.json' },
      ],
    }),
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
}