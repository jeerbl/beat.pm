var gulp = require('gulp');
var connect = require('gulp-connect');
var inlinesource = require('gulp-inline-source');

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true
  })
})

gulp.task('html', function () {
  gulp.src('./src/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
})

gulp.task('watch', function () {
  gulp.watch(['./src/*.html', './src/styles/*.css', './src/scripts/*.js'], ['html']);
})

gulp.task('default', ['connect', 'watch', 'html']);
gulp.task('test', ['html']);
