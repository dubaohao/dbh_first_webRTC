const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js', //相对路径
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist') //打包文件的输出路径
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".tsx", "scss", "scss"],
        // 设置别名
        alias: {
            "@": path.resolve(__dirname, "./src"), // 这样配置后 @ 可以指向 src 目录
        },
    },
    module: {
        rules: [
            {
                test:/\.tsx|jsx?$/,
                use:[
                    {
                        loader:'ts-loader',
                        options:{
                            transpileOnly: true, // 只进行语法转换,不进行类型校验,提高构建速度
                        }
                    }
                ],
                exclude:/node_modules/
            },
            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                use: {
                    loader: 'babel-loader', //使用的加载器名称
                    options: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.css|scss|sass$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]__[hash:base64:6]"
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        
                    }
                ],
                exclude:[path.resolve(__dirname, '..', 'node_modules')]
            },
            {
                test: /\.png|svg|jpeg$/,
                use: ['file-loader']
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
            manifest: "./public/manifest.json",
            favicon: "./public/favicon.ico",
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        open: false,
        historyApiFallback: true,
        client: {
            progress: true,
        },
        // https: true,
    }
}