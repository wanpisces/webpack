**需要处理的文件类型**
开发文档： https://www.webpackjs.com/concepts/
（一）
Html：   html-webpack-plugin 脚本： babel+bale-preset-react 
样式：css-loader+sass-loader   
图片/字体：url-loader+file-loader

（二）
html-webpack-plugin：  html单独打包成文件
extract-text-webpack-plugin:样式打包成单独文件
commonsChuncPlugin,提出通用模块，webpack自带的

（三）
webpack-dev-server:
为webpack项目提供web服务，更改代码自动刷新，做代理
启动：node_modules/.bin/webpack

搭建流程
（1）npm i webpack@3.10.0 --dev
(2)新建src入口文件夹以及app.js文件，dist出口文件夹；
新建 webpack.config.js 基本配置如下：

```
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js"
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname, "src/page")//配置公共地址
    }
  },
};
```
（3）所需基本插件（安装）
1，[html-webpack-plugin](https://www.webpackjs.com/concepts/#%E6%8F%92%E4%BB%B6-plugins-)
npm i html-webpack-plugin@2.30.1 --dev
```
const path = require("path");
// 安装start
const HtmlWebpackPlugin = require("html-webpack-plugin");----------------------add
// 安装end
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js"
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })]--------add，其中默认的输出就是src下新建的index.html文件
};
```
2,脚本 [babel-loader](https://www.webpackjs.com/loaders/babel-loader/)   
npm install babel-loader@7.1.2 babel-core@6.26.0  babel-preset-env@1.6.1 --dev
```
 module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
```
 - 对于react的项目搭建
npm i babel-preset-react@6.24.1 --dev

```
module.exports = {
  entry: "./src/app.jsx", ----------------------------------------------------jsx
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/, ----------------------------------------------------jsx
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            //   env:在浏览器和node环境下都可以配置，后面是react环境
            presets: ["env", "react"]------------------react
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })]
};

```
[将react添加到已有项目中](https://reactjs.org/docs/create-a-new-react-app.html)
npm i react@16.2.0 react-dom@16.2.0 --dev
将app.js文件改名为app.jsx;代码如下：
```
import React from "react";
import ReactDOM from "react-dom";
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(element, document.getElementById("app"));
```
3，[css样式的配置](https://webpack.docschina.org/guides/asset-management/#-css)
npm i --save-dev style-loader css-loader

```
rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
```
建立style.css文件在app.jsx文件中引入 ,这样会将css打包到js文件中

    import "./style.css";

 - [独立出css文件](https://webpack.docschina.org/plugins/extract-text-webpack-plugin/#src/components/Sidebar/Sidebar.jsx)
npm i extract-text-webpack-plugin@3.0.2 --dev

```
const ExtractTextPlugin = require("extract-text-plugin");//先定义引入，再plugins中配置

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ -----------------------替换
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" }),
  new ExtractTextPlugin('style.css') ----------------------配置
]

```

 - [sass用法](https://webpack.docschina.org/loaders/sass-loader/)
npm i node-sass@4.7.2  sass-loader@6.0.6 --dev
引入同css一样在app.jsx中

```
import "./style.scss";

{
	test: /\.scss$/,
	use: ExtractTextPlugin.extract({
	use: ["css-loader", "sass-loader"],
	// 在开发环境使用 style-loader
	fallback: "style-loader"
	})
}
```

4、 [图片文件加载file-loader](https://webpack.docschina.org/loaders/file-loader/) 或[url-loader](https://webpack.docschina.org/loaders/url-loader/)
  npm i file-loader@1.1.6 url-loader@0.6.2 -dev

```
{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
```

5、 [引入字体](http://fontawesome.dashgame.com/)
 - [加载字体](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD%E5%AD%97%E4%BD%93)
 npm i font-awesome
 

```
webpack配置
//加载字体
     {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ["file-loader"]
      }
```

 在app.jsx中引入：` import 'font-awesome/css/font-awesome.min.css'`
 

 - 提出公共模块

```
new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "js/base.js"
    })
```
6、[时实编译 webpack-dev-server](https://webpack.docschina.org/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-server)
npm i webpack-dev-server@2.9.7 --save-dev
```
devServer: {
    contentBase: "./dist"
  }
```
启动：node_modules/.bin/webpack-dev-server

 - 在package.json中

```
"scripts": {
    "dev": "node_modules/.bin/webpack-dev-server --port=9091",
    "dist": "node_modules/.bin/webpack"
  },
```
完整webpack.config.js代码

```
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
   new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "/favicon.icon"//地址图标
    }),
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
    historyApiFallback: {
      index: "/dist/index.html"//找不到路径时访问，默认访问这个
    }
  }
};

```

