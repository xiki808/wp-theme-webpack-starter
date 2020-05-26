const { entries, hmrPathParams, devtool } = require("./config");

const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let entryList = {};

for (const entry of entries) {
  entryList[entry.target] = [
    `webpack-hot-middleware/client?${hmrPathParams}`,
    entry.source,
  ];
}

module.exports = {
  mode: "development",
  entry: entryList,
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
            loader: "cache-loader",
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
  devtool: devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
