const path = require("path");

module.exports = {
  //context path is assets
  context: path.resolve(process.cwd()),
  devtool: "eval-cheap-source-map",
  outputDirectory: path.resolve(process.cwd(), "../src/"),
  layers: [
    {
      end: "front",
      files: [
        {
          entry: "../front/styles/style.scss",
        },
        {
          entry: "../front/scripts/header.js",
          output: "front/header.js",
        },
        {
          entry: "../front/scripts/footer.js",
          output: "front/footer.js",
        },
      ],
    },
    {
      end: "back",
      files: [
        {
          entry: "../back/styles/style.scss",
        },
        {
          entry: "../back/scripts/header.js",
          output: "back/header.js",
        },
        {
          entry: "../back/scripts/footer.js",
          output: "back/footer.js",
        },
      ],
    },
  ],
};
