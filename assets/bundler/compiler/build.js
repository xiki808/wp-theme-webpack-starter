const webpack = require("webpack");
const merge = require("webpack-merge");

const prodConfig = require("../webpack.prod");
const commonConfig = require("../webpack.common");
const config = merge(commonConfig, prodConfig);

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);

    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  if (stats.hasErrors()) {
    console.error(
      stats.toString({
        all: false,
        colors: true,
        errors: true,
      })
    );

    return;
  }

  if (stats.hasWarnings()) {
    console.warn(
      stats.toString({
        all: false,
        colors: true,
        errors: true,
      })
    );
  }

  console.log(
    stats.toString({
      colors: true,
      chunks: false,
      modules: false,
      entrypoints: false,
      children: false,
    })
  );
});
