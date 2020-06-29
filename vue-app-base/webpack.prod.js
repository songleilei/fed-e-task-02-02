const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
        },
      ],
    }),
  ],
  devtool: "none",
};

module.exports = merge(common, config);
