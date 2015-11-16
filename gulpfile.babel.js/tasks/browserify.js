import path from 'path'
import _ from 'lodash'
import gulp from 'gulp'
import gutil from 'gulp-util'

const TASK_NAME = 'browserify'

function browserifyTask() {
  const browserify = require('browserify')
  const watchify = require('watchify')
  const source = require('vinyl-source-stream')
  const rename = require('gulp-rename')

  function bundle(config) {

    return config.bundler.bundle()
      .on('error', (err) => {
        wrapWithPluginError(err)
      })
      .pipe(source(config.entry))
      .pipe(rename((obj) => {
        obj.dirname = ''
        obj.basename = config.options.basename || obj.basename
        obj.extname = '.js'
      }))
      .pipe(whenInProductionDoUglify())
      .pipe(gulp.dest(config.dest))
  }

  function browserifyOnce(config = {}) {

    if (!config.bundler) {
      config.bundler = browserify(config.options)
    }

    if (config.entry) {
      config.bundler.add(path.join(process.cwd(), config.entry))
    } else {
      config.entry = _.uniqueId('vendor_')
    }

    [
      'plugin',
      'require',
      'external'
    ].forEach((method) => {
      [].concat(config.options[method])
        .forEach((args) => {
          if (args) {
            config.bundler[method].apply(config.bundler, [].concat(args))
          }
        })
    })

    return bundle(config)

  }

  function whenInProductionDoUglify() {
    const streamify = require('gulp-streamify')
    const uglify = require('gulp-uglify')

    if (process.env.NODE_ENV === 'production') {
      return streamify(uglify({
        compress: {
          'pure_funcs': ['console.log']
        }
      }))
    }
    return gutil.noop()
  }

  function wrapWithPluginError(originalError) {
    let message

    if (typeof originalError === 'string') {
      message = originalError
    } else {
      message = originalError.message.toString()
    }
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message)
    }

    gutil.log(new gutil.PluginError(TASK_NAME, message))
  }

  return gulp.autoRegister(TASK_NAME, browserifyOnce, (config) => {

    config.bundler = browserify(_.merge({}, config.options, watchify.args))
    config.bundler = watchify(config.bundler)

    config.bundler.on('update', bundle.bind(null, config))
    config.bundler.on('time', (time) => {
      gutil.log(gutil.colors.cyan('watchify'),
        're-bundled', 'after', gutil.colors.magenta(time > 1000 ? time / 1000 + ' s' : time + ' ms'))
    })

  })
}

gulp.task(TASK_NAME, browserifyTask)

export default browserifyTask