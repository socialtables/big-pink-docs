var path = require('path');
var gulp = require('gulp');
var react = require('gulp-react');
var del = require('del');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var browserify = require("gulp-browserify");
var plumber = require("gulp-plumber");

var paths = {
  js: {
    src: "src/js/**/*",
    srcMain: "src/js/index.js",
    targetDir: "public/js"
  },
  jsx: {
    src: "src/jsx/*.jsx",
    targetDir: 'src/compiled-jsx'
  },
  less: {
    srcMain: 'src/less/style.less',
    allSrc: 'src/less/**/*',
    srcDir: 'src/less',
    targetDir: 'public/css'
  },
  testDirs: './src/**/__tests__',

};

function deleteCompiledJSX(cb) {
  var compiledFiles = paths.jsx.targetDir + "/**/*.js";
  del([compiledFiles], cb);
};

// Clean-up final compiled development assets
gulp.task('clean-compiled-assets', function(cb) {
  del([
    'public/js/start.js',
    'public/css/style.min.css',
    'public/js/socialtables-onsite.js'
  ], cb);
});

// Remove compiled JSX (dev)
gulp.task('remove-compiled-jsx-dev', ['browserify'], function(cb) {
  deleteCompiledJSX(cb);
});

// Compile JSX to JS
gulp.task('compile-jsx', function() {
  return gulp.src(paths.jsx.src)
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest(paths.jsx.targetDir));
});

// Take the source JS and run browserify
gulp.task('browserify', ['compile-jsx'], function() {
  return gulp.src(paths.js.srcMain)
    .pipe(plumber())
    .pipe(browserify())
    .pipe(gulp.dest(paths.js.targetDir));
});

// Compile less
gulp.task('less', function() {
  
  return gulp.src(paths.less.srcMain)
    .pipe(plumber())
    .pipe(less({
      compress: true,
      paths: paths.less.srcDir
    }))
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min' }))
    .pipe(gulp.dest(paths.less.targetDir));
});

// Rerun the task when a file changes
gulp.task('watch', ['scrub', 'less', 'build-dev'], function() {
  gulp.watch(paths.less.allSrc, ['less']);
  gulp.watch([paths.jsx.src, paths.js.src], ['build-dev']);
});

// Custom task that generates a compiled version of the application JS code
gulp.task('build-dev', ['compile-jsx', 'browserify', 'remove-compiled-jsx-dev']);
// Custom task that cleans up all compiled files (Public and compiled JSX)
gulp.task('scrub', ['remove-compiled-jsx-dev', 'clean-compiled-assets']);
/* CLI task to run during development */
gulp.task('dev', ['scrub', 'less', 'build-dev', 'watch']);
/* CLI default task (run when you execute `gulp` only) */
gulp.task('default', ['dev']);
