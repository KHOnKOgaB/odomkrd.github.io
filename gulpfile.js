const { src, dest, parallel, series, watch } = require('gulp');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-minify-css');
const rimraf = require('rimraf');
const browserSync = require("browser-sync");
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const imagemin = require('gulp-imagemin');
const reload = browserSync.reload;

const path = {
    build: {
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img',
        fonts: 'build/fonts'
    },
    src: {
        html: 'src/*.html',
        style: 'src/scss/*.scss',
        js: 'src/js/main.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
const config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    // host: 'localhost',
    // port: 8085,
    // logPrefix: "knowHow"
};

function html() {
  return src(path.src.html)
    .pipe(rigger())
    .pipe(dest(path.build.html))
    .pipe(reload({stream: true}))
};

function js() {
  return browserify(path.src.js)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(dest(path.build.js))
    .pipe(reload({stream: true}))
};

function style() {
  return src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.css))
    .pipe(reload({stream: true}))
};

function fonts() {
    return src(path.src.fonts)
      .pipe(dest(path.build.fonts));
};

function img() {
    return src(path.src.img)
      .pipe(dest(path.build.img))
      .pipe(imagemin({verbose: true}))
      .pipe(reload({stream: true}));
};

function watching() {
  watch([path.watch.js], (cb) =>  js());
  watch([path.watch.style], (cb) => style());
  watch([path.watch.html], (cb) => html());
  watch([path.watch.fonts], (cb) => fonts());
  watch([path.watch.img], (cb) => img());
};

function webserver() {
  return browserSync(config);
};

function clean() {
  return rimraf(path.clean, cb);
};

const build = parallel(html, js, style, fonts, img);

exports.html = html;
exports.js = js;
exports.style = style;
exports.fonts = fonts;
exports.img = img;
exports.watching = watching;
exports.webserver = webserver;
exports.clean = clean;
exports.build = build
exports.default = parallel(build, webserver, watching)
