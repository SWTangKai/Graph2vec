const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

commonConfig = {
    /*入口*/
    entry: {
        app: ["react-hot-loader/patch", path.join(__dirname, "src/index.js")],
        vendor: ["react", "react-router-dom", "react-dom"]
    },

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, "./dist"),
        filename: `[name].[chunkhash].js`,
        chunkFilename: "[name].[chunkhash].js"
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, "src/pages"),
            component: path.join(__dirname, "src/component"),
            router: path.join(__dirname, "src/router")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader?cacheDirectory=true"],
                include: path.join(__dirname, "src")
            },
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src/index.html")
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "runtime"]
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin()
    ]
};

module.exports = commonConfig;