const { src, dest, parallel, watch } = require("gulp");
const nunjucks = require("gulp-nunjucks-html");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const data = require("gulp-data");
const fs = require("fs");

function templates() {
  return src("src/**/*.html")
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync("./projects.json"));
      })
    )
    .pipe(nunjucks())
    .pipe(dest("_site"));
}

function buildSass() {
  return src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss())
    .pipe(dest("_site"));
}

exports.default = parallel(templates, buildSass);
exports.watch = watch(
  [
    "src/**/*.html",
    "gulpfile.js",
    "src/**/*.js",
    "src/**/*.scss",
    "projects.json",
  ],
  parallel(templates, buildSass)
);
