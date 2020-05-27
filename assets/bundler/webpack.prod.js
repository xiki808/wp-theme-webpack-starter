const { entries, getEntries } = require("./config");

const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: getEntries(entries),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "cache-loader",
          },
          {
            loader: "babel-loader", // transpile modern JS for old browsers
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        // Loaders are loaded in revers, from bottom up
        loader: [
          {
            loader: MiniCssExtractPlugin.loader, // Extract CSS into separate files. Replaces style-loader
          },
          {
            loader: "css-loader", // Resolves import and url
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Split vendor code to its own chunk(s)
        vendors: {
          name: "js/vendor",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/i,
        },
      },
    },
    // The runtime should be in its own chunk
    // This saves some common JS since we have multiple entries
    // runtimeChunk is the webpack JS code used to load modules
    runtimeChunk: {
      name: "js/runtime",
    },
  },
  plugins: [
    // Clean the JS file created by MiniCssExtractPlugin after extracting CSS
    // Keep for development mode to allow SCSS HMR
    new FixStyleOnlyEntriesPlugin({
      silent: true,
    }),
  ],
};
