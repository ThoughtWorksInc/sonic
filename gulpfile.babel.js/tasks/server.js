import gulp from 'gulp'
import browserSync from 'browser-sync'

const TASK_NAME = 'server'

function serverOnce(callback, fileConf) {
  browserSync
    .create(TASK_NAME)
    .init(fileConf.options, callback)
}

function server(callback) {
  gulp.autoRegister(TASK_NAME, serverOnce.bind(this, callback))
}

gulp.task(TASK_NAME, server)

export default server