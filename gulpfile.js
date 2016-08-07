var gulp = require('gulp');
var connect = require('gulp-connect');
var inlinesource = require('gulp-inline-source');

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true
  })
})

gulp.task('html', () => {
  gulp.src('./src/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
})

gulp.task('watch', () => {
  gulp.watch(['./src/*.html', './src/styles/*.css', './src/scripts/*.js'], ['html']);
})

gulp.task('default', ['connect', 'watch', 'html']);
gulp.task('test', ['html']);
