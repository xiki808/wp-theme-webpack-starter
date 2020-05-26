const path = require("path");

// Get the theme name - needs to be relative to the bundler directory
const theme = path.basename(path.resolve("../../"));

module.exports = {
  assetsTargetFolder: "../src", // The directory path for assets, relative to the bundler directory
  assetsPublicFolder: `/wp-content/themes/${theme}/assets/src/`, // The public directory path of the new processed files, relative to the domain url
  entries: [
    // target: The entry file path relative to the 'assetsTargetFolder'
    // source: The source file path relative to the bundler directory
    { target: "front/styles/style", source: "../front/styles/style.scss" },
    { target: "front/scripts/header", source: "../front/scripts/header.js" },
    { target: "front/scripts/footer", source: "../front/scripts/footer.js" },
    { target: "back/styles/style", source: "../back/styles/style.scss" },
    { target: "back/scripts/header", source: "../back/scripts/header.js" },
    { target: "back/scripts/footer", source: "../back/scripts/footer.js" },
  ],
  imagesPublicFolder: "images/", // The public and target folder for image assets, public path is relative to 'assetsPublicFolder'
  fontsPublicFolder: "fonts/", // The public and target folder for fonts assets, public path is relative to 'assetsPublicFolder'
  svgPublicFolder: "svg/", // The public and target folder for svg assets, public path is relative to 'assetsPublicFolder'
  proxyTarget: "http://new.loc", // The local WordPress virtual host name// The local WordPress virtual host name
  hmrPathParams: "noInfo=true", // The query strings parameters attached to the hmr url
  devtool: "source-map",
  watchFiles: ["../../**/*.php", "!../../assets"], // Files BrowserSync will watch. Use '!' to exclude.
};
