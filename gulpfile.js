const gulp = require("gulp");
const webpack = require("webpack-stream");
const WebpackDevServer = require("webpack-dev-server");

function buildTS() {
  return gulp
    .src("src/index.ts")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("dist/"));
}

function copyIndex() {
  return gulp.src("./index.html").pipe(gulp.dest("dist/"));
}

exports.default = gulp.parallel(buildTS, copyIndex);
