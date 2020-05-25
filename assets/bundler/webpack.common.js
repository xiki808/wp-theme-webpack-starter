const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "../src/"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/wp-content/themes/wp-theme-webpack-starter/assets/src/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader", // transpile modern JS for old browsers
          options: {
            presets: ["@babel/preset-env"],
          },
        },
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
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
  },
  context: path.resolve(__dirname),
  target: "web",
  // optimization: {
  //   splitChunks: {
  //     name: "base",
  //   },
  // },
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
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
    new CleanWebpackPlugin(),
  ],
};
