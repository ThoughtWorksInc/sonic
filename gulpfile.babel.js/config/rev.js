import gulp from 'gulp'

export default {
  'src': [
    `${gulp.config('root.dist')}/**`
  ],
  'dest': `${gulp.config('root.dist')}/`,
  'options': {
    'dontRenameFile': [
      /^\/index.html/g
    ]
  }
}