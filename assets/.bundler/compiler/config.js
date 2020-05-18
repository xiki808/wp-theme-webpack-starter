module.exports = {
  context: __dirname,
  devtool: "eval-cheap-source-map",
  outputDirectory: path.resolve(__dirname, "../src/"),
  files: [
    {
      entry: "../front/scripts/header.js",
      output: "front/header.js",
    },
    {
      entry: "../front/scripts/footer.js",
      output: "front/footer.js",
    },
    {
      entry: "../front/styles/style.scss",
    },
    {
      entry: "../back/scripts/header.js",
      output: "back/header.js",
    },
    {
      entry: "../back/scripts/footer.js",
      output: "back/footer.js",
    },
    {
      entry: "../back/styles/style.scss",
    },
  ],
};
