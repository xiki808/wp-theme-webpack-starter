const { entries, hmrPathParams, devtool, getEntries } = require("./config");

const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: getEntries(entries, hmrPathParams, true),
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        // Loaders are loaded in revers, from bottom up
        loader: [
          {
            loader: MiniCssExtractPlugin.loader, // Extract CSS into separate files. Replaces style-loader. Needed to keep back and front styles separate.
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
            loader: "postcss-loader",
            options: {
              config: {
                path: "postcss.config.js",
              },
            },
          },
          {
            loader: "sass-loader", // Loads Sass files and compiles them to CSS
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["../scss/globals/*.scss"],
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
