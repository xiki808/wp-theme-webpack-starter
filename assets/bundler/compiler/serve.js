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
      publicPath: webpackConfig({ mode: "development" }).output.publicPath,
      //most probably useless
      // hot: true,
      stats: { colors: true },
      // logLevel: "silent",
      // quiet: true,
    }),
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
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
  snippetOptions: {
    rule: {
      match: /<\/head>/i,
      fn: function (snippet, match) {
        return `<script src="//localhost:3000/wp-content/themes/wp-theme-webpack-starter/assets/src/front/styles/style.js"></script>${snippet}${match}`;
      },
    },
  },
});
