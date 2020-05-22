const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    "front/styles/style": [
      "webpack-hot-middleware/client?reload=true",
      "../front/styles/style.scss",
    ],
    "front/scripts/header": [
      "webpack-hot-middleware/client?reload=true",
      "../front/scripts/header.js",
    ],
    "front/scripts/footer": [
      "webpack-hot-middleware/client?reload=true",
      "../front/scripts/footer.js",
    ],
    "back/styles/style": [
      "webpack-hot-middleware/client?reload=true",
      "../back/styles/style.scss",
    ],
    "back/scripts/header": [
      "webpack-hot-middleware/client?reload=true",
      "../back/scripts/header.js",
    ],
    "back/scripts/footer": [
      "webpack-hot-middleware/client?reload=true",
      "../back/scripts/footer.js",
    ],
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        // Loaders are loaded in revers, from bottom up
        loader: [
          {
            loader: MiniCssExtractPlugin.loader, // Extract CSS into separate files. Replaces style-loader
            options: {
              hmr: true, // Only enable HMR in development
              reloadAll: true, // If HMR does not work, this is a forceful method.
            },
          },
          {
            loader: "css-loader", // Resolves import and url
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader", // Loads Sass files and compiles them to CSS
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devtool: "cheap-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
