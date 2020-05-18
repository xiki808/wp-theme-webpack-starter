const config = require("./compiler/config");
const tools = require("./compiler/tools");

module.exports = (options) =>
  [
    config.layers.map((layer, lIndex) => {
      return layer.files.map((file, fIndex) => {
        let details = tools.getDetails(layer.end, file, lIndex, fIndex);
        console.log(config.context);
        console.log(config.outputDirectory);
        return {
          // mode: options.dev ? "development" : "production",
          context: config.context,
          devtool: config.devtool,
          entry: details.entry,
          output: details.output,
          module: details.modules,
          plugins: details.plugins,
        };
      });
    }),
  ].flat(2);
