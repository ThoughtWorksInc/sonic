import _ from 'lodash'
import path from 'path'
import gulp from 'gulp'
import gutil from 'gulp-util'
import browserSync from 'browser-sync'
import selenium from 'selenium-standalone'
const TASK_NAME = 'e2e'

function e2e(callback) {

  const webdriver = require('gulp-webdriver')

  gulp.autoRegister(TASK_NAME, (conf)=> {

    const options = conf.options || {}

    Promise.race([
      gutil.env['skip-install'] ?
        Promise.resolve() :
        seleniumInstall(options.selenium)
    ])
      .then(()=> {
        return Promise.all([
          staticServer(options.server),
          findAPortNotInUse({
            portStart: 12306,
            portEnd: 60321
          }).then(port=>seleniumServer({port}))
        ])
      })
      .then(([browserSyncInst, seleniumInst])=> {

        gulp.src('wdio.conf.js', {read: false})
          .pipe(webdriver(Object.assign(options.wdio || {}, {
            port: seleniumInst.port,
            baseUrl: browserSyncInst.getOption('urls').get('local'),
            wdioBin: path.join(process.cwd(), 'node_modules', '.bin', 'wdio')
          })))
          .once('finish', ()=> {
            seleniumInst.kill()
            browserSyncInst.exit()
            callback()
          })
      })
      .catch(gutil.log.bind(this))

  })

}


gulp.task(`${TASK_NAME}:clean`, (callback)=> {
  const psNode = require('ps-node')
  psNode.lookup({
    command: /java/,
    arguments: /selenium-standalone/
  }, (err, resultList)=> {
    if (err) {
      throw new Error(err)
    }
    resultList.forEach((foundProcess)=> {
      if (foundProcess) {
        console.log('KILLING PID: %s, COMMAND: %s, ARGUMENTS: %s', foundProcess.pid, foundProcess.command, foundProcess.arguments)
        process.kill(foundProcess.pid)
      }
    })
    callback()
  })
})

export default gulp.task(TASK_NAME, e2e)


function findAPortNotInUse(options = {}) {
  const portscanner = require('portscanner')
  return new Promise((resolve, reject)=> {
    portscanner.findAPortNotInUse(
      options.portStart || 1000,
      options.portEnd || 60000,
      '127.0.0.1',
      (err, port)=> {
        return err ? reject(err) : resolve(port)
      })
  })
}

function seleniumInstall(options = {}) {
  return new Promise((resolve, reject)=> {
    selenium.install(Object.assign(options, {
      logger: gutil.log.bind(this),
      progressCb: gutil.log.bind(this)
    }), (err)=> {
      return err ? reject(err) : resolve()
    })
  })
}

function staticServer(options = {}) {
  return new Promise((resolve, reject)=> {
    const id = _.uniq('e2e')
    browserSync
      .create(id)
      .init(Object.assign(options, {
        notify: false,
        open: false,
        ui: false,
        port: 9000
      }), (err)=> {
        return err ? reject(err) : resolve(browserSync.get(id))
      })
  })
}

function seleniumServer(options = {}) {
  return new Promise((resolve, reject)=> {
    selenium.start(Object.assign(options, {
      seleniumArgs: ['-port', options.port]
    }), (err, seleniumInst)=> {
      if (err) {
        return reject(err)
      }
      gutil.log(`selenium serve on ${options.port}`)
      seleniumInst.port = options.port
      return resolve(seleniumInst)
    })
  })
}
