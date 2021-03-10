const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");

// Style

const styles = () => {
  return gulp.src("source/sass/style/scss")
  .pipe(sass())
}

exports.styles = styles;