// Gulp.js configuration
var // modules
  gulp = require("gulp"),
  newer = require("gulp-newer"),
  imagemin = require("gulp-imagemin"),
  htmlclean = require("gulp-htmlclean"),
  wait = require("gulp-wait"),
  concat = require("gulp-concat"),
  deporder = require("gulp-deporder"),
  stripdebug = require("gulp-strip-debug"),
  uglify = require("gulp-uglify"),
  scss = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  assets = require("postcss-assets"),
  autoprefixer = require("autoprefixer"),
  mqpacker = require("css-mqpacker"),
  cssnano = require("cssnano"),
  babel = require("gulp-babel");

// development mode?
//process = (process.env.NODE_ENV !== 'production'),
devBuild = false;
// folders
folder = {
  src: "src/",
  build: "build/"
};

// image processing
gulp.task("img", function () {
  var out = folder.build + "img/";
  return gulp
    .src(folder.src + "img/**/*")
    .pipe(newer(out))
    .pipe(
      imagemin({
        optimizationLevel: 5
      })
    )
    .pipe(gulp.dest(out));
});

//index
gulp.task("index", function () {
  var out = folder.build,
    page = gulp.src(folder.src + "index.html");
  // minify production code //off
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }
  return page.pipe(gulp.dest(out));
});

// HTML processing
gulp.task("html", ["img"], function () {
  var out = folder.build + "html/",
    page = gulp.src(folder.src + "html/**/*").pipe(newer(out));

  // minify production code //off
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

// JavaScript processing //change vars to reflect folders
gulp.task("js", function () {
  var build = gulp
    .src(folder.src + "js/**/*")
    .pipe(deporder())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(concat("main.js"));

  if (!devBuild) {
    build = build.pipe(stripdebug()).pipe(uglify());
  }
  //return folders that are in the build folder
  return build.pipe(gulp.dest(folder.build + "js/"));
});

// CSS processing // Sass
gulp.task("css", ["img"], function () {
  var postCssOpts = [
    assets({
      loadPaths: ["img/"]
    }),
    autoprefixer({
      browsers: ["last 2 versions", "> 2%"]
    }),
    mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp
    .src(folder.src + "scss/*")
    .pipe(wait(500))
    .pipe(
      scss({
        outputStyle: "nested",
        includePaths: [folder.src + "/scss/partials/**"],
        imagePath: "img/",
        precision: 3,
        errLogToConsole: true
      })
    )
    .pipe(concat("styles.css"))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build + "css/"));
});

// fires up a webserver
var gulp = require("gulp");
var webserver = require("gulp-webserver");

gulp.task("webserver", function () {
  gulp.src("./").pipe(
    webserver({
      livereload: true,
      directoryListing: true,
      open: true
    })
  );
});

// run all tasks
gulp.task("run", ["index", "html", "css", "js", "webserver"]);

// watch for changes
gulp.task("watch", function () {
  // image changes
  gulp.watch(folder.src + "img/**/*", ["img"]);

  //index changes
  gulp.watch(folder.src + "index.html", ["index"]);

  // html changes
  gulp.watch(folder.src + "html/**/*", ["html"]);

  // javascript changes
  gulp.watch(folder.src + "js/**/*", ["js"]);

  // css changes
  gulp.watch(folder.src + "scss/**/*", ["css"]);
});

// default task
gulp.task("default", ["run", "watch"]);