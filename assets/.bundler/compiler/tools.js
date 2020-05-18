const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = require("./config");

module.exports = {
  scssLoader() {
    return [
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
    ];
  },
  fileLoader(end) {
    return [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: config.context,
          outputPath: `${end}/images/`,
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: config.context,
          outputPath: `${end}/fonts/`,
        },
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: config.context,
          outputPath: `${end}/svg/`,
        },
      },
    ];
  },
  getDetails(end, file, lIndex, fIndex) {
    const type = file.entry.includes(".scss") ? "css" : "js";

    let entry = "";

    switch (type) {
      case "css":
        entry = {
          style: file.entry,
        };
        break;
      case "js":
        entry = file.entry;
        break;
    }

    let output = {};

    switch (type) {
      case "css":
        output = {
          path: config.outputDirectory,
        };
        break;
      case "js":
        output = {
          path: config.outputDirectory,
          filename: file.output,
        };
        break;
    }

    let modules = {};

    switch (type) {
      case "css":
        modules = {
          rules: [...this.scssLoader(), ...this.fileLoader(end)],
        };
        break;
      case "js":
        modules = {};
        break;
    }

    let plugins = [];

    switch (type) {
      case "css":
        plugins = [
          // By default webpack alwasy creates a js file, hence when we are extracting css,
          // it will create a css file and also the js file. This plugin stops webpack generating the extra js file.
          // This issue will probably be fixed in version 5
          new FixStyleOnlyEntriesPlugin(),
          new MiniCssExtractPlugin({
            filename: `${end}/style.css`,
            // Up one level into the assets directory
            publicPath: "../",
          }),
        ];
        break;
      case "js":
        plugins = [];
        break;
    }
    // return { entry, output, modules, plugins };
    return this.lastFileConfig(
      { entry, output, modules, plugins },
      lIndex,
      fIndex
    );
  },
  lastFileConfig(details, lIndex, fIndex) {
    if (
      config.layers.length - 1 === lIndex &&
      config.layers[lIndex].files.length - 1 === fIndex
    ) {
      details.plugins = [...details.plugins, new CleanWebpackPlugin()];
    }

    return details;
  },
};
