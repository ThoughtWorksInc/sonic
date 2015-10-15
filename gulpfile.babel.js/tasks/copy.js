import gulp from 'gulp'

const TASK_NAME = 'copy'

function copyOnce(fileConf) {
  const rename = require('gulp-rename')
  return gulp.src(fileConf.src)
    .pipe(rename((pathObj)=> {
      if (fileConf.options.flatten) {
        pathObj.dirname = ''
      }
      if (fileConf.options.baseRegExp) {
        pathObj.dirname = pathObj.dirname.replace(fileConf.options.baseRegExp, '')
      }
    }))
    .pipe(gulp.dest(fileConf.dest))
    .pipe(gulp.pipeTimer(TASK_NAME))
}

function copy() {
  return gulp.autoRegister(TASK_NAME, copyOnce, (config)=> {
    gulp.watch(config.src, ()=> {
      copyOnce(config)
    })
  })
}

export default gulp.task(TASK_NAME, copy)
