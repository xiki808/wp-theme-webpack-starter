const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = "development";
const devtool = "eval-cheap-source-map";
const scssLoader = [
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

const config = {};

const fileLoader = [
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      context: path.resolve(__dirname, "src/"),
      outputPath: "images/",
    },
  },
  {
    test: /\.(otf|eot|ttf|woff|woff2)$/,
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      context: path.resolve(__dirname, "src/"),
      outputPath: "fonts/",
    },
  },
  {
    test: /\.(svg)$/,
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      context: path.resolve(__dirname, "src/"),
      outputPath: "svg/",
    },
  },
];

const modules1 = {
  rules: [
    ...scssLoader,
    ...[
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: path.resolve(__dirname, "src/"),
          outputPath: "front/images/",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: path.resolve(__dirname, "src/"),
          outputPath: "front/fonts/",
        },
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: path.resolve(__dirname, "src/"),
          outputPath: "front/svg/",
        },
      },
    ],
  ],
};

const modules2 = {
  rules: [
    ...scssLoader,
    ...[
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: path.resolve(__dirname, "src/"),
          outputPath: "back/images/",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: path.resolve(__dirname, "src/"),
          outputPath: "back/fonts/",
        },
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          context: path.resolve(__dirname, "src/"),
          outputPath: "back/svg/",
        },
      },
    ],
  ],
};

const pluginsCSS = [
  // By default webpack alwasy creates a js file, hence when we are extracting css,
  // it will create a css file and also the js file. This plugin stops webpack generating the extra js file.
  // This issue will probably be fixed in version 5
  // Check if you still need this. With using clean-webpack-plugin this might be redundant
  new FixStyleOnlyEntriesPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
];

const plugins = [new CleanWebpackPlugin()];

const configFrontHeader = {
  mode: mode,
  devtool: devtool,
  entry: "../front/scripts/header.js",
  output: {
    path: path.resolve(__dirname, "../src/"),
    filename: "front/header.js",
  },
};

const configFrontStyle = {
  mode: mode,
  devtool: devtool,
  // Entry key is needed to name the css file. Since webpack by default creates a js file, we cannot give it an
  // explicit file name due to conflict of naming both css and js file the same.
  entry: { style: "../front/styles/style.scss" },
  output: {
    path: path.resolve(__dirname, "../src/"),
    // Up one level into the assets directory
    publicPath: "../",
  },
  module: modules1,
  plugins: [
    // By default webpack alwasy creates a js file, hence when we are extracting css,
    // it will create a css file and also the js file. This plugin stops webpack generating the extra js file.
    // This issue will probably be fixed in version 5
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "front/style.css",
    }),
  ],
};

const configFrontFooter = {
  mode: mode,
  devtool: devtool,
  entry: "../front/scripts/footer.js",
  output: {
    path: path.resolve(__dirname, "../src/"),
    filename: "front/footer.js",
  },
};

const configBackHeader = {
  mode: mode,
  devtool: devtool,
  entry: "../back/scripts/header.js",
  output: {
    path: path.resolve(__dirname, "../src/"),
    filename: "back/header.js",
  },
};

const configBackStyle = {
  mode: mode,
  devtool: devtool,
  // Entry key is needed to name the css file. Since webpack by default creates a js file, we cannot give it an
  // explicit file name due to conflict of naming both css and js file the same.
  entry: { style: "../back/styles/style.scss" },
  output: {
    path: path.resolve(__dirname, "../src/"),
  },
  module: modules2,
  plugins: [
    // By default webpack alwasy creates a js file, hence when we are extracting css,
    // it will create a css file and also the js file. This plugin stops webpack generating the extra js file.
    // This issue will probably be fixed in version 5
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "back/style.css",
      // Up one level into the assets directory
      publicPath: "../",
    }),
  ],
};

const configBackFooter = {
  mode: mode,
  devtool: devtool,
  entry: "../back/scripts/footer.js",
  output: {
    path: path.resolve(__dirname, "../src/"),
    filename: "back/footer.js",
  },
  devServer: {},
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [
  configFrontHeader,
  configFrontStyle,
  configFrontFooter,
  configBackHeader,
  configBackStyle,
  configBackFooter,
];
