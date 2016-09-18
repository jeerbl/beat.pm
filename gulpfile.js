var gulp = require('gulp');
var connect = require('gulp-connect');
var inlinesource = require('gulp-inline-source');

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('resources', function () {
  gulp.src('./src/resources/*')
    .pipe(gulp.dest('./dist/resources'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./src/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/resources/*'], ['resources']);
  gulp.watch(['./src/*.html', './src/styles/*.css', './src/scripts/*.js'], ['html']);
});

gulp.task('default', ['connect', 'watch', 'resources', 'html']);
gulp.task('test', ['resources', 'html']);
