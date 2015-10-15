import gulp from 'gulp'
import gutil from 'gulp-util'

const TASK_NAME = 'lint'

function lintOnce(fileConf) {
  const eslint = require('gulp-eslint')
  return gulp.src(fileConf.src)
    .pipe(eslint(fileConf.options))
    .pipe(eslint.formatEach())
    .pipe(process.env.NODE_ENV === 'production' ? eslint.failOnError() : gutil.noop())
}

function lint() {
  return gulp.autoRegister(TASK_NAME, lintOnce)
}

gulp.task(TASK_NAME, lint)

export default lint
