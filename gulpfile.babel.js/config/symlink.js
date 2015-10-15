import gulp from 'gulp'

export default {
  src: `${gulp.config('root.shared')}`,
  dest: `node_modules/${gulp.config('root.shared')}`
}
