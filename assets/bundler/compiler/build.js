const webpack = require("webpack");

const webpackConfig = require("../webpack.config");

compiler = webpack(webpackConfig({ mode: "production" }));
compiler.run();
