const path = require("path");

// Get the theme name - needs to be relative to the bundler directory
const theme = path.basename(path.resolve("../../"));

module.exports = {
  assetsTargetFolder: "../src", // The directory path for assets, relative to the bundler directory
  assetsPublicFolder: `/wp-content/themes/${theme}/assets/src/`, // The public directory path of the new processed files, relative to the domain url
  entries: [
    // target: The entry file path relative to the 'assetsTargetFolder'
    // source: The source file path relative to the bundler directory
    { target: "css/front/style", source: "../scss/front/style.scss" },
    { target: "js/front/header", source: "../js/front/header.js" },
    { target: "js/front/footer", source: "../js/front/footer.js" },
    { target: "css/back/style", source: "../scss/back/style.scss" },
    { target: "js/back/header", source: "../js/back/header.js" },
    { target: "js/back/footer", source: "../js/back/footer.js" },
  ],
  imagesPublicFolder: "images/", // The public and target folder for image assets, public path is relative to 'assetsPublicFolder'
  fontsPublicFolder: "fonts/", // The public and target folder for fonts assets, public path is relative to 'assetsPublicFolder'
  svgPublicFolder: "svg/", // The public and target folder for svg assets, public path is relative to 'assetsPublicFolder'
  proxyTarget: "http://new.loc", // The local WordPress virtual host name// The local WordPress virtual host name
  hmrPathParams: "noInfo=true", // The query strings parameters attached to the hmr url
  devtool: "source-map",
  watchFiles: ["../../**/*.php", "!../../assets"], // Files BrowserSync will watch. Use '!' to exclude.
  // Aliases set for a module will be available in the JS file without the need to import.
  moduleAlias: {
    // Example -  _: "lodash",
  },
  getEntries: (entries, hmrPathParams = "", dev = false) => {
    let entryList = {};

    for (const entry of entries) {
      entryList[entry.target] = dev
        ? [`webpack-hot-middleware/client?${hmrPathParams}`, entry.source]
        : entry.source;
    }

    return entryList;
  },
};
