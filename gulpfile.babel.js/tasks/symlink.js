import gulp from 'gulp'

const TASK_NAME = 'symlink'

function symlinkOnce(fileConf) {
  const gulpSymlink = require('gulp-symlink')
  
  return gulp.src(fileConf.src)
    .pipe(gulpSymlink(fileConf.dest, {force: true}))
}

function symlink() {
  return gulp.autoRegister(TASK_NAME, symlinkOnce)
}

gulp.task(TASK_NAME, symlink)

export default symlink
