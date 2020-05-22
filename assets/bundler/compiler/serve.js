const browserSync = require("browser-sync");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const webpackConfig = require("../webpack.config");

const compiler = webpack(webpackConfig({ mode: "development" }));

browserSync({
  middleware: [
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig({ mode: "development" }).output.publicPath, // The path where to bind the middleware to the server
      stats: { colors: true },
      logLevel: "silent",
    }),
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    }),
  ],
  host: "localhost",
  port: 3000,
  files: ["../../**/*.php", "!../../assets"], // Monitor changes under theme folder, exclude assets directory
  proxy: { target: "http://new.loc/" }, // Proxy target to virtual host
  notify: false,
  loglevel: "silent",
  snippetOptions: {
    // Use the snippetOptions to inject the JS style files to allow HMR for SCSS
    rule: {
      match: /<\/head>/i,
      fn: function (snippet, match) {
        return `<script src="//localhost:3000/wp-content/themes/wp-theme-webpack-starter/assets/src/front/styles/style.js"></script>
        <script src="//localhost:3000/wp-content/themes/wp-theme-webpack-starter/assets/src/back/styles/style.js"></script>${snippet}${match}`;
      },
    },
  },
});
