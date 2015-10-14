import _ from 'lodash'
import gulp from 'gulp'
import rename from 'gulp-rename'
import gulpIconfont from 'gulp-iconfont'
import syncProcessor from 'gulp-sync-processor'
import gulpSvgIgnore from 'gulp-svg-ignore'
import md5 from 'md5'
import mapStream from 'map-stream'

const TASK_NAME = 'iconfont'

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

function iconfont() {
  return gulp.autoRegister(TASK_NAME, iconfontOnce, (config)=> {
    gulp.watch(config.src, ()=> {
      iconfontOnce(config)
    })
  })
}

gulp.task(TASK_NAME, iconfont)
