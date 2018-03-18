const path = require("path");
// 引入html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    /*入口*/
    entry: ["webpack-dev-server/client", path.join(__dirname, "src/index.js")],

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, "src/pages"),
            component: path.join(__dirname, "src/component"),
            router: path.join(__dirname, "src/router")
        }
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader?cacheDirectory=true"],
                include: path.join(__dirname, "src")
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React Demo",
            template: path.resolve(root, "template.html")
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "./dist"),
        publicPath: "/",
        port: 8080,
        historyApiFallback: true
    }
};
