const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const path = require("path");
module.exports = (a, b) => {
  return {
    mode: b ? b.mode : a.mode,
    context: path.resolve(__dirname),
    devtool: "eval-cheap-source-map",
    target: "web",
    entry: {
      "front/scripts/header": [
        "webpack-hot-middleware/client?path=__webpack_hmr&reload=true",
        "../front/scripts/header.js",
      ],
      "front/scripts/footer": [
        "webpack-hot-middleware/client?path=__webpack_hmr&reload=true",
        "../front/scripts/footer.js",
      ],
      "front/styles": [
        "webpack-hot-middleware/client?path=__webpack_hmr&reload=true",
        "../front/styles/style.scss",
      ],
      "back/scripts/header": [
        "webpack-hot-middleware/client?path=__webpack_hmr&reload=true",
        "../back/scripts/header.js",
      ],
      "back/scripts/footer": [
        "webpack-hot-middleware/client?path=__webpack_hmr&reload=true",
        "../back/scripts/footer.js",
      ],
      "back/styles": [
        "webpack-hot-middleware/client?path=__webpack_hmr&reload=true",
        "../back/styles/style.scss",
      ],
    },
    output: {
      path: path.resolve(__dirname, "../src/"),
      filename: "[name].js",
      //point to theme folder
      publicPath: "../../",
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
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name]/style.css`,
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
};
