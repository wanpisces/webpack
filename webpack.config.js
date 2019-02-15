const path = require("path");
const webpack = require("webpack");
// 安装start
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 安装end
module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "js/app.js"
  },
  module: {
    rules: [
      //react（jsx）的处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            //   env:在浏览器和node环境下都可以配置，后面是react环境
            presets: ["env", "react"]
          }
        }
      },
      //css文件的处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      //scss文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"],
          // 在开发环境使用 style-loader
          fallback: "style-loader"
        })
      },
      //图片配置处理
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "resource/[name].[ext]" //指定路径
            }
          }
        ]
      },
      //加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8192,
              name: "resource/[name].[ext]" //指定路径
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //处理html文件
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    //独立css文件
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "js/base.js"
    })
  ],
  devServer: {
    // contentBase: "./dist"
    port: 9090,
    open: false //是否打开浏览器
  }
};
