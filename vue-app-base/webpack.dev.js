const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    hotOnly: true,
    stats: "errors-only",
    contentBase: "./public",
  },
  devtool: "cheap-module-eval-source-map",
};

module.exports = merge(common, config);
