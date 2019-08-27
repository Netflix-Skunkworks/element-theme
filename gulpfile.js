'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

gulp.task('build', () => {
  return gulp
    .src('./src/index.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: [
          'last 3 Chrome versions',
          'last 3 Firefox versions',
          'last 2 Safari versions',
        ],
        cascade: false,
      }),
    )
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});

gulp.task('watch', () => {
  return gulp.watch(
    [
      './src/*.scss',
      // Also watch for changes to `theme-chalk` files when using `yarn link` to
      // develop against a local version of `element-ui`.
      './node_modules/element-ui/packages/theme-chalk/src/**/*',
    ],
    gulp.series('build'),
  );
});

gulp.task('dev', gulp.series('build', 'watch'));
