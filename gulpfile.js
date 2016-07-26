var gulp = require('gulp')
var connect = require('gulp-connect')

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true
  })
})

gulp.task('html', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
})

gulp.task('watch', () => {
  gulp.watch(['./src/*.html'], ['html'])
})

gulp.task('default', ['connect', 'watch', 'html'])
