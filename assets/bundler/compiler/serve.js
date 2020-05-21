const webpack = require("webpack");
const browserSync = require("browser-sync");

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const webpackConfig = require("../webpack.config");

const compiler = webpack(webpackConfig({ mode: "development" }));

browserSync({
  middleware: [
    webpackDevMiddleware(compiler, {
      // The path where to bind the middleware to the server.
      publicPath:
        "http://new.loc/wp-content/themes/wp-theme-webpack-starter/assets/src/",
      hot: true,
      // logLevel: "silent",
      // quiet: true,
    }),
    webpackHotMiddleware(compiler, {
      // log: false,
      // logLevel: "none",
    }),
  ],
  host: "localhost",
  port: 3000,
  //theme folder
  files: ["../../**/*.php", "!../../assets"],
  proxy: { target: "http://new.loc/" },
  notify: false,
  loglevel: "silent",
  logPrefix: "",
});
