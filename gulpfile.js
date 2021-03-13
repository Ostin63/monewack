const {src, dest, series, watch, parallel} = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const uglify = require('gulp-uglify-es').default;
const del = require("del");
const sync = require("browser-sync").create();

// Style

const styles = () => {
  return src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest("build"))
}

exports.html = html;

// Scripts

const scripts = () => {
  return src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const images = () => {
  return src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
  .pipe(dest("build/img"))
}

exports.images = images;

// Copy

const copy = (done) => {
  src([
      "source/fonts/*.{woff2,woff}",
      "source/*.ico",
      "source/img/**/*.{jpg,png,svg}",
    ], {
      base: "source"
    })
    .pipe(dest("build"))
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  watch("source/sass/**/*.scss", series(styles));
  watch("source/js/script.js", series(scripts));
  watch("source/*.html", series(html, reload));
}

// Build

const build = series(
  clean,
  parallel(
    styles,
    html,
    scripts,
    copy,
    images
  ));

exports.build = build;

// Default

exports.default = series(
  clean,
  parallel(
    styles,
    html,
    scripts,
    copy
  ),
  series(
    server,
    watcher
  ));
