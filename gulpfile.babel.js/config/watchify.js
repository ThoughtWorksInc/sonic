import gulp from 'gulp'
import path from 'path'
import _ from 'lodash'
import lrload from 'livereactload'
import babelify from 'babelify'
import envify from 'envify'

const vendorBrowser = require(path.join(process.cwd(), gulp.config('root.src'), 'package.json')).browser
const jsDestFolder = `${gulp.config('root.dist')}/assets/js`
const basedir = path.join(process.cwd(), gulp.config('root.src'))

export default {
  files: [{
    'dest': jsDestFolder,
    'options': {
      'basename': 'vendor',
      'basedir': basedir,
      'debug': true,
      'require': _.map(_.keys(vendorBrowser), function(key) {
        return [
          vendorBrowser[key], {
            expose: key
          }
        ]
      })
    }
  }, {
    entry: `${gulp.config('root.src')}/index.js`,
    dest: jsDestFolder,
    options: {
      plugin: [lrload],
      external: _.keys(vendorBrowser),
      transform: [
        [babelify, {
          "plugins": [
            "react-transform"
          ],
          "extra": {
            "react-transform": {
              "transforms": [{
                "transform": "livereactload/babel-transform",
                "imports": ["react"]
              }]
            }
          }
        }],
        [envify, {}]
      ]
    }
  }],
  verbose: true,
  debug: true,
  extensions: ['.jsx', '.js'],
  cache: {},
  packageCache: {}
}
