const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");
module.exports = (env, args) => {
  return {
    mode: args.mode,
    context: path.resolve(process.cwd()),
    devtool: "eval-cheap-source-map",
    entry: {
      "front/scripts/header": "../front/scripts/header.js",
      "front/scripts/footer": "../front/scripts/footer.js",
      "front/styles": "../front/styles/style.scss",
      "back/scripts/header": "../back/scripts/header.js",
      "back/scripts/footer": "../back/scripts/footer.js",
      "back/styles": "../back/styles/style.scss",
    },
    output: {
      path: path.resolve(process.cwd(), "../src/"),
      filename: "../src/[name].js",
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
            context: path.resolve(process.cwd()),
            outputPath: `/images/`,
          },
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            context: path.resolve(process.cwd()),
            outputPath: `/fonts/`,
          },
        },
        {
          test: /\.(svg)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            context: path.resolve(process.cwd()),
            outputPath: `/svg/`,
          },
        },
      ],
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: `[name]/style.css`,
        // Up one level into the assets directory
        publicPath: "../",
      }),
      new CleanWebpackPlugin(),
    ],
    devServer: {
      contentBase: "../src",
    },
  };
};
