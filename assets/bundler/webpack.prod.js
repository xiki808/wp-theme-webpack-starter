const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    "front/styles/style": "../front/styles/style.scss",
    "front/scripts/header": "../front/scripts/header.js",
    "front/scripts/footer": "../front/scripts/footer.js",
    "back/styles/style": "../back/styles/style.scss",
    "back/scripts/header": "../back/scripts/header.js",
    "back/scripts/footer": "../back/scripts/footer.js",
  },
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
            loader: "sass-loader", // Loads Sass files and compiles them to CSS
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
          name: "vendor",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/i,
        },
      },
    },
    // The runtime should be in its own chunk
    // This saves some common JS since we have multiple entries
    // runtimeChunk is the webpack JS code used to load modules
    runtimeChunk: {
      name: "runtime",
    },
  },
  plugins: [
    // Clean the JS file created by MiniCssExtractPlugin after extracting CSS
    // Keep for development mode to allow SCSS HMR
    new FixStyleOnlyEntriesPlugin(),
  ],
};
