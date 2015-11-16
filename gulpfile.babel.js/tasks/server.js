import gulp from 'gulp'

const TASK_NAME = 'server'

function serverOnce(callback, fileConf) {
  const browserSync = require('browser-sync')

  browserSync
    .create(TASK_NAME)
    .init(fileConf.options, callback)
}

function server(callback) {
  gulp.autoRegister(TASK_NAME, serverOnce.bind(this, callback))
}

gulp.task(TASK_NAME, server)

export default server
