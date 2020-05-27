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
      all: false,
      assets: true,
      assetSort: "size",
      colors: true,
      errors: true,
      logging: "none",
      timings: true,
      warnings: true,
    })
  );
});
