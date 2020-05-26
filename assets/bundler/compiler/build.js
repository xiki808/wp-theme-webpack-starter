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

  console.log(
    stats.toString({
      assets: true,
      assetSort: "size",
      builtAt: false,
      colors: true,
      chunks: false,
      chunkGroups: false,
      entrypoints: false,
      errors: true,
      errorDetails: false,
      errorStack: false,
      hash: false,
      logging: "none",
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
    })
  );
});
