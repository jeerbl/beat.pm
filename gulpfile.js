var gulp = require('gulp')
var connect = require('gulp-connect')

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true
  })
})

gulp.task('default', ['connect'])
