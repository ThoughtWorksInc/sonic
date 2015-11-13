import _ from 'lodash'
import gulp from 'gulp'

const TASK_NAME = 'iconfont'

function iconfont() {
  const rename = require('gulp-rename')
  const gulpIconfont = require('gulp-iconfont')
  const syncProcessor = require('gulp-sync-processor')
  const gulpSvgIgnore = require('gulp-svg-ignore')
  const md5 = require('md5')
  const mapStream = require('map-stream')

  function iconfontOnce(conf) {

    const tplData = {
      fontConfig: _.merge({}, conf.options)
    }

    return gulp.src(conf.src)
      .pipe(gulpSvgIgnore(['#gridlines', '#grids']))
      .pipe(gulpIconfont(conf.options))
      .on('glyphs', (glyphs)=> {
        tplData.glyphs = glyphs.map((glyph)=> {
          glyph.codePoint = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
          return glyph
        })
      })
      .pipe(mapStream((file, callback)=> {
        tplData.fontConfig.hash = md5(String(file.contents))
        callback(null, file)
      }))
      .pipe(syncProcessor({
        files: _.map(conf.options.tpls, (fileConf)=> {
          return {
            src: fileConf.src,
            dest: fileConf.dest
          }
        }),
        options: {
          data: tplData,
          isProcess: function (data) {
            return data.glyphs.length > 0
          }
        }
      }))
      .pipe(rename(function (pathObj) {
        if (_.indexOf(['.ttf', '.svg', '.eot', '.woff', '.woff2'], pathObj.extname) > -1) {
          pathObj.dirname = conf.dest
        }
      }))
      .pipe(gulp.dest(process.cwd()))
      .pipe(gulp.pipeTimer(TASK_NAME))
  }

  return gulp.autoRegister(TASK_NAME, iconfontOnce, (config)=> {
    gulp.watch(config.src, ()=> {
      iconfontOnce(config)
    })
  })
}

gulp.task(TASK_NAME, iconfont)
