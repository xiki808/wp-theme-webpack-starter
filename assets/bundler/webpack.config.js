const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = (options) => {
  return {
    mode: options.mode,
    context: path.resolve(__dirname),
    devtool: options.mode === "development" ? "eval-cheap-source-map" : false,
    target: "web",
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
      "back/scripts/header": [
        "webpack-hot-middleware/client?reload=true",
        "../back/scripts/header.js",
      ],
      "back/scripts/footer": [
        "webpack-hot-middleware/client?reload=true",
        "../back/scripts/footer.js",
      ],
      "back/styles/style": [
        "webpack-hot-middleware/client?reload=true",
        "../back/styles/style.scss",
      ],
    },
    output: {
      path: path.resolve(__dirname, "../src/"),
      filename: "[name].js",
      publicPath: "/wp-content/themes/wp-theme-webpack-starter/assets/src/",
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
                hmr: options.mode === "development", // Only enable HMR in development
                reloadAll: options.mode === "development", // If HMR does not work, this is a forceful method.
              },
            },
            {
              loader: "css-loader", // Resolves @import and url
            },
            {
              loader: "sass-loader", // Loads Sass files and compiles them to CSS
            },
          ],
        },
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
    plugins: [
      ...(options.mode !== "development"
        ? // Clean the JS file created by MiniCssExtractPlugin after extracting CSS
          // Keep for development mode to allow SCSS HMR
          [new FixStyleOnlyEntriesPlugin()]
        : []),
      new MiniCssExtractPlugin({
        filename: `[name].css`,
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
};
