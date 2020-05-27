# WordPress Theme Webpack Starter

A WordPress theme starter to use as a starting template to build a custom theme. The template makes use of namespaces as specified by [PSR-4](https://www.php-fig.org/psr/psr-4/). It also has a complete webpack setup for a better developer experience and asset management.

![Template](https://media.giphy.com/media/26ufhYjBs6C4Q5SJG/giphy.gif?style=centerme)

---

## Getting Started

### Namespacing

The template uses a namespace prefix `WTWS`. This can be changed to any other prefix from the `composer.json` file and hence it needs to be replaced in any other class file where it is used.

1. Replace the prefix `WTWS` in `composer.json` autoload configuration with your custom one.
2. Replace the prefix in files `Includes/Init.php` and `Includes/Enqueue.php` above the class definition.

Other subdirectories can be added to this namespace by following the below steps and example:

1. Create a new folder ( Example: `Seasons` ) under `Includes` directory.
2. Add a file under the `Seasons` directory, ( Example: `Summer.php` ).
3. Define class `Summer` in the new file.
4. Add the namespace above the class definition: `namespace WTWS\Seasons;`

To instantiate classes within the same namespace, call the class name directly. For classes existing in other namespaces, refer to the class using the `use` keyword above the class definition.

1. Inside a method in the `Init` class call the other class from another directory: `$class = new Summer();`
2. Above the `Init` class definition refer to the namespace: `use WTWS\Seasons\Summer;`

### Webpack

The webpack configuration can be found under the `assets/bundler` directory. Start the compiler from this directory.

- Initiate compiler in development mode: `yarn serve`
- Initiate compiler in production mode: `yarn build`

The configuration comes packed with features to improve the developer experience and asset management.

It is configured to create two javascript files and a css file for the front end and another same set of files for the back end. This files are expected and enqueued in the `Enqueue` class.

Some of the configurations can be changed from the `config.js` file under the `bundler` directory. However, it is recommended to use the following directories and files as follows:

- `assets/js/front/header.js` - Any Javascript to be included in the `<header>` of the front end
- `assets/js/front/footer.js` - Any Javascript to be included under the `<footer>` of the front end
- `assets/scss/front/styles.scss` - Any SCSS to be included in the `<header>` of the front end

* `assets/js/back/header.js` - Any Javascript to be included in the `<header>` of the back end
* `assets/js/back/footer.js` - Any Javascript to be included under the `<footer>` of the back end
* `assets/scss/back/styles.scss` - Any SCSS to be included in the `<header>` of the back end

- `assets/scss/globals/` - Any SCSS files that will be imported into the other `front` and `back` SCSS files

* `assets/fonts/` - Place any fonts needed
* `assets/images/` - Place any image of any format needed

Webpack will process and bundle these assets into the `assets/src` directory and this is where they are enqueued from.

### Proxying

Since we are running a dynamic PHP website using Wordpress a virtual host needs to be setup. The host name needs to be defined in the `proxyTarget` found in the `config.js`. This is used in development mode to proxy the emitted files from webpack to our virtual host.

---

## Features

### Hot Module Replacement and BrowerSync

When running the configuration in development mode HMR is enabled - any JS and SCSS changes will appear on the browser without a hard refresh. In order for HMR to work on JS files, a detection needs to be implemented to tell webpack to accept the updated module. This is already implemented in the provided JS entries ( files ) using the following code:

```
if (module.hot) module.hot.accept();
```

This code can be left there as it is not included on `yarn build`.

Any changes to the PHP files are detected by BrowserSync and hence the changes for these files also appear on the browser with an automatic hard refresh.

### SCSS Globals

Any global SCSS needed, such as variables or mixins, can be either placed in the files found in `assets/scss/globals` or in a new file under the same directory. By default this template already provides 4 files with the naming indicating obvious intentions.

### PostCSS

PostCSS is also part of the pack with the following plugins pre-configured:

- PostCSS Normalize - Applies Normalize.css only for the browsers defined in the browserlist
- PostCSS Preset Env - Converts modern CSS for older browsers
- PostCSS Autoprefixer - Adds vendor prefixes to CSS rules for the browsers defined in the browserlist

The browserlist can be found in `package.json`. Any changes needed to PostCSS can be configured in `postcss.config.js`.

### JS and Imports

In production mode, JS files are transpiled for old browsers using `babel`, so you can use modern JS too!

Import new modules by installing them under the `assets/bundler` directory using `yarn` or `npm`.

Example: `yarn add lodash`.

These modules can then be imported in the JS file where needed

```
import lodash from 'lodash`;

lodash.join(['a', 'b', 'c'], '~');
```

### JS Global Modules

Modules can be available globally to all JS files without the need of importing. After installing the module add an alias to the module to `moduleAlias` object, in the `config.js` file. The alias can be used in any of the JS files to access the module.

### Defined Chunks

In production mode, the configuration is optimized to split the JS code into more granular chunks to reduce duplication of code. These chunks are enqueued if the file exists.

- `src/js/runtime.js` - Webpack's module loader implementation is extracted here from each JS file
- `src/js/vendor.js` - Any module used from `node_modules` is extracted to this file

---

## TODOs

- Split the vendor chunks into independent chunks for front and back
- Include JS and SCSS linting
- More testing! - This is a setup collected from my experience using WordPress and Webpack and I haven't used this one in a real project yet.