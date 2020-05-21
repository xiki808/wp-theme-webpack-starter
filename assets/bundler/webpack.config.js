const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const path = require("path");
module.exports = (options) => {
  options = {};
  options.mode = "development";
  return {
    mode: options.mode,
    context: path.resolve(__dirname),
    devtool: options.mode === "development" && "eval-cheap-source-map",
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
      //point to theme folder
      publicPath: "/wp-content/themes/wp-theme-webpack-starter/assets/src/",
    },
    module: {
      rules: [
        {
          test: /\.s(a|c)ss$/,
          // Loaders are loaded in revers, from bottom up
          // array of objects can be replaced to just a list array if no option are passed
          loader: [
            {
              // Extract CSS into separate files. Replaces style-loader
              loader: MiniCssExtractPlugin.loader,
              options: {
                // only enable hot in development
                hmr: options.mode === "development",
                // if hmr does not work, this is a forceful method.
                reloadAll: true,
              },
              // loader: "style-loader",
            },
            {
              // Resolves @import and url()
              loader: "css-loader",
            },
            // {
            //   loader: "resolve-url-loader",
            // },
            {
              // Loads Sass files and compiles them to CSS
              loader: "sass-loader",
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
      // new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name].css`,
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
};
