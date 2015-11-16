import gulp from 'gulp'
import tape from 'gulp-tape'
import tapSpec from 'tap-spec'

const TASK_NAME = 'test'

function testOnce(conf) {
  const gulpMocha = require('gulp-spawn-mocha')

  return gulp.src(conf.src, {read: false})
    .pipe(gulpMocha(conf.options))
}

function test() {
  return gulp.autoRegister(TASK_NAME, testOnce)
}

gulp.task(TASK_NAME, test)

export default test
