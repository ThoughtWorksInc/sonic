import gulp from 'gulp'
import gutil from 'gulp-util'

const TASK_NAME = 'jade'

function jade() {
  const gulpJade = require('gulp-jade')
  const gulpData = require('gulp-data')

  function jadeOnce(fileConf) {
    return gulp.src(fileConf.entry)
      .pipe(gulpData(fileConf.options.data))
      .pipe(gulpJade(fileConf.options))
      .pipe(gulp.dest(fileConf.dest))
      .pipe(gulp.pipeTimer(TASK_NAME))
  }

  return gulp.autoRegister(TASK_NAME, jadeOnce, (config)=> {
    gulp.watch(config.src, (evt)=> {
      gutil.log(evt.type, evt.path)
      jadeOnce(config)
    })
  })
}

export default gulp.task(TASK_NAME, jade)
