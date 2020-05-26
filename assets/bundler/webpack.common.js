const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "../src/"),
    filename: "[name].js",
    publicPath: "/wp-content/themes/wp-theme-webpack-starter/assets/src/",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/",
          context: path.resolve(__dirname, "../src/images/"),
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/",
          publicPath: "../../fonts/",
        },
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "svg/",
          publicPath: "../../svg/",
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
  },
  context: path.resolve(__dirname),
  target: "web",
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
    new CleanWebpackPlugin(),
  ],
};
