import gulp from 'gulp'

const TASK_NAME = 'clean'

function clean(callback) {
  const del = require('del')
  gulp.autoRegister(TASK_NAME, (config)=> {
    del.sync(config.src)
    callback()
  })
}

gulp.task(TASK_NAME, clean)

export default clean
