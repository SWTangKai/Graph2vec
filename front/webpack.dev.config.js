const path = require("path");
const merge = require("webpack-merge");

const commonConfig = require("./webpack.common.config.js");

const devConfig = {
    devtool: "inline-source-map",
    entry: {
        app: ["react-hot-loader/patch", path.join(__dirname, "src/index.js")]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: "[name].[hash:8].js"
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "./dist"),
        historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    }
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === "entry.app") {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);