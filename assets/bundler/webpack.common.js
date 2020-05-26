const {
  assetsTargetFolder,
  assetsPublicFolder,
  imagesPublicFolder,
  fontsPublicFolder,
  svgPublicFolder,
} = require("./config");

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, assetsTargetFolder),
    filename: "[name].js",
    publicPath: assetsPublicFolder,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: imagesPublicFolder,
          publicPath: `${assetsPublicFolder}${imagesPublicFolder}`,
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: fontsPublicFolder,
          publicPath: `${assetsPublicFolder}${fontsPublicFolder}`,
        },
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: svgPublicFolder,
          publicPath: `${assetsPublicFolder}${svgPublicFolder}`,
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
