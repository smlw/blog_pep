/* eslint-disable node/no-published-require */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat') 
const uglifyjs = require('gulp-uglifyjs') 
/* eslint-enable node/no-published-require */

gulp.task('scss', () => {
  return gulp
    .src('dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('scripts', () =>
  gulp
    .src('dev/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('public/javascripts'))
);


gulp.task('nodemon', function () { nodemon({script: 'index.js'}) });

gulp.task('default', ['scss', 'nodemon', 'scripts'], () => {
  gulp.watch('dev/scss/**/*.scss', ['scss']);
  gulp.watch('dev/js/**/*.js', ['scripts']);
});
