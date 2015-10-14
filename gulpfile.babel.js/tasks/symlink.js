import gulp from 'gulp'
import gulpSymlink from 'gulp-symlink'

const TASK_NAME = 'symlink'

function symlinkOnce(fileConf) {
  return gulp.src(fileConf.src)
    .pipe(gulpSymlink(fileConf.dest, {force: true}))
}

function symlink() {
  return gulp.autoRegister(TASK_NAME, symlinkOnce)
}

gulp.task(TASK_NAME, symlink)

export default symlink

