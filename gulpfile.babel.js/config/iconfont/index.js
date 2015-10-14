import gulp from 'gulp'
import path from 'path'

export default {
  src: `${gulp.config('root.shared')}/components/icon/svgs/*.svg`,
  dest: `${gulp.config('root.dist')}/assets/fonts`,
  options: {
    'formats': ['ttf', 'eot', 'woff', 'woff2'],
    'tpls': [
      {
        src: path.join(__dirname, './tpls/global-icons.styl.ejs'),
        dest: `${gulp.config('root.shared')}/components/icon/styles/__generated/global-icons.styl`
      },
      {
        src: path.join(__dirname, './tpls/util-icons.styl.ejs'),
        dest: `${gulp.config('root.shared')}/components/icon/styles/__generated/util-icons.styl`
      }, {
        src: path.join(__dirname, './tpls/IconTypes.js.ejs'),
        dest: `${gulp.config('root.shared')}/components/icon/constants/__generated/IconTypes.js`
      }
    ],

    'fontName': 'iconfont',
    'normalize': true,
    'fixedWidth': true,
    'fontHeight': 576,
    'descent': 576 / 12 * 2,
    'centerHorizontally': true,
    'fontShortName': 'icon',

    'bem': true
  }
}