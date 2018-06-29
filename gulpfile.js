'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      debug = require('gulp-debug'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create();

gulp.task('pug', function () {
  return gulp.src('src/pug/*.pug')
      .pipe(pug())
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist'))
});

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist/js'))
});

gulp.task('img', function () {
  return gulp.src('src/img/**/*.*')
      .pipe(debug({title: 'working on'}))
      .pipe(gulp.dest('dist/img'))
});

gulp.task('common-files', function () {
  return gulp.src('src/libs/**/**.*')
      .pipe(gulp.dest('dist/libs'))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    notify: true
  })
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.*', gulp.series('sass'));
  gulp.watch('src/pug/**/*.*', gulp.series('pug'));
  gulp.watch('src/js/**/*.*', gulp.series('js'));

  gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('build', gulp.series('clean', 'pug', 'sass', 'js', 'img', 'common-files'));

gulp.task('serve', gulp.parallel('watch', 'browser-sync'));

gulp.task('dev', gulp.series('build', 'serve'));