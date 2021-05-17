const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync");
const data = require("gulp-data");
const nunjucks = require("gulp-nunjucks-html");
const fs = require("fs");

const config = {
  scss: "src/**/*.scss",
  css: "_site/**/*.css",
  html: "src/**/*.html",
  js: "src/**/*.js",
  output: "_site",
};

const buildStyles = function () {
  // Run tasks on all Sass files
  return src(config["scss"])
    .pipe(
      sass({
        outputStyle: "expanded",
        sourceComments: true,
      })
    )
    .pipe(dest(config["output"]))
    .pipe(postcss())
    .pipe(dest(config["output"]));
};

// Copy static files into output folder
const javscript = function () {
  // Copy static files
  return src(config["js"]).pipe(dest(config["output"]));
};

const templates = function () {
  return src(config["html"])
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync("./projects.json"));
      })
    )
    .pipe(nunjucks())
    .pipe(dest(config["output"]));
};

// Watch for changes to the src directory
const startServer = function (done) {
  // Initialize BrowserSync
  browserSync.init({
    server: {
      baseDir: config["output"],
    },
  });

  // Signal completion
  done();
};

// Reload the browser when files change
const reloadBrowser = function (done) {
  browserSync.reload();
  done();
};

// Watch for changes
const watchSource = function (done) {
  watch(
    [config.html, config.scss, config.js, "gulpfile.js", "projects.json"],
    series(exports.default, reloadBrowser)
  );
  done();
};

/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = parallel(buildStyles, javscript, templates);

// Watch and reload
// gulp watch
exports.watch = series(exports.default, startServer, watchSource);
