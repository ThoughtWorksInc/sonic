import gulp from 'gulp'
import path from 'path'
import _ from 'lodash'

const TASK_NAME = 'rev'

function revOnce(conf) {
  const RevAll = require('gulp-rev-all')
  const del = require('del')
  const mapStream = require('map-stream')

  const revAll = new RevAll(conf.options)

  function revCleaner() {
    return mapStream((file, callback)=> {
      const manifest = JSON.parse(String(file.contents))

      const fileListNeedToClean = Object.keys(manifest)
        .filter((key)=>key !== manifest[key])

      del.sync(fileListNeedToClean, {
        cwd: file.base
      })

      callback(null, file)

    })
  }

  function generateCacheManifest() {
    return mapStream((file, callback)=> {
      const manifest = JSON.parse(String(file.contents))

      file.path = path.join(file.base, 'cache.manifest')
      file.contents = new Buffer(
        [
          `CACHE MANIFEST`,
          `# ${new Date().getTime()}`,
          `index.html`,
          `NETWORK:`,
          `*`,
          `CACHE:`
        ].concat(
          (_.values(_.omit(manifest, [
            'index.html'
          ])) || [])
        ).join('\n'))

      callback(null, file)

    })
  }

  return gulp.src(conf.src)
    .pipe(revAll.revision())
    .pipe(gulp.dest(conf.dest))
    .pipe(revAll.manifestFile())
    .pipe(revCleaner())
    .pipe(generateCacheManifest())
    .pipe(gulp.dest(conf.dest))
}

function rev() {
  gulp.autoRegister(TASK_NAME, revOnce)
}

export default gulp.task(TASK_NAME, rev)
