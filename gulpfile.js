var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    inject = require('gulp-inject');

var reload = browserSync.reload;
// Lint Task
gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass and minify CSS
gulp.task('sass', function() {
  return gulp.src('app/assets/scss/*.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/assets/css'));
});

// Concatenate and minify JS
gulp.task('scripts', function() {
  return gulp.src('app/**/*.js')
    .pipe(concat('stamper.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('stamper.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// browserSync
gulp.task('browser-sync', function() {
  browserSync({
    server: './app',
  });
});

gulp.task('inject', function() {
  return gulp.src('app/index.html')
    .pipe(inject(gulp.src(['app/**/*.js', 'app/**/*.css'], {read: false})))
    .pipe(gulp.dest('app'));
});
gulp.task('watch', function() {
  gulp.watch('app/**/*', ['lint', 'sass', 'inject'], reload);
});
gulp.task('default', ['lint', 'sass', 'browser-sync', 'inject', 'watch']);
