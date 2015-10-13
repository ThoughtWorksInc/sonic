import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpJade from 'gulp-jade'
import gulpData from 'gulp-data'

const TASK_NAME = 'jade'

function jadeOnce(fileConf) {
  return gulp.src(fileConf.entry)
    .pipe(gulpData(fileConf.options.data))
    .pipe(gulpJade(fileConf.options))
    .pipe(gulp.dest(fileConf.dest))
    .pipe(gulp.pipeTimer(TASK_NAME))
}

function jade() {
  return gulp.autoRegister(TASK_NAME, jadeOnce, (config)=> {
    gulp.watch(config.src, (evt)=> {
      gutil.log(evt.type, evt.path)
      jadeOnce(config)
    })
  })
}

export default gulp.task(TASK_NAME, jade)
