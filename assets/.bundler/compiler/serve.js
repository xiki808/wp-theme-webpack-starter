console.log('yoooo');
const path = require("path");

module.exports = {
  entry: "../assets/scripts/header.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
};
