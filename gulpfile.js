var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del'),
  htmlmin = require('gulp-htmlmin'),
  usemin = require('gulp-usemin');

//gulp.task('styles', function() {
//  return gulp.src('src/styles/main.scss')
//    .pipe(sass({ style: 'expanded' }))
//    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//    .pipe(gulp.dest('dist/assets/css'))
//    .pipe(rename({suffix: '.min'}))
//    .pipe(minifycss())
//    .pipe(gulp.dest('dist/assets/css'))
//    .pipe(notify({ message: 'Styles task complete' }));
//});

gulp.task('scripts', function() {
  return gulp.src('js/**/*.js')//src/scripts/**/*.js
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('minify', function() {
  return gulp.src('dev.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('../websites'))
});

gulp.task('usemin', function () {
  return gulp.src('dev.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(usemin({
      jsvendor: [uglify()],
      jsmain: [uglify()]
      // in this case css will be only concatenated (like css: ['concat']).
    }))
    .pipe(gulp.dest('../websites'));
});
