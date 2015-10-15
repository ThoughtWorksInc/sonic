import gulp from 'gulp'

const TASK_NAME = 'build'

function build(callback) {
  const runSequence = require('run-sequence')
  const conf = gulp.config(['tasks', TASK_NAME])
  runSequence.apply(gulp, [].concat(conf.taskQueue).concat(callback))
}

gulp.task(TASK_NAME, build)

export default build
