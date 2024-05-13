const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = {
  watch: true,
  mode: 'production',
  entry: {
    filename: path.resolve(__dirname, 'src/popup.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/popup.js',
    assetModuleFilename: 'assets/[name][ext][query]'
  },
  // performance: {
  //   hints: false,
  //   maxAssetSize: 512000,
  //   maxEntrypointSize: 512000
  // },
  plugins: [new MiniCssExtractPlugin({filename:'css/popup.css'}), new HtmlWebpackPlugin({filename:'html/popup.html', template: 'src/popup.html'})],
  module:{
    
      rules: [
        {
          test: /\.css$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          }, 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          // loader: 'file-loader',
          // options: {
          //   name: 'fonts/[name].[ext]'
          // }
        },
      ],
    },
    optimization: {
      minimize:true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ],
    },
    
  
}