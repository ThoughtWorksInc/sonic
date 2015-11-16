import gulp from 'gulp'

export default {
  'files': [
    {
      'src': [
        `${gulp.config('root.src')}/**/images/*`
      ],
      'dest': `${gulp.config('root.dist')}/assets/images`
    },
    {
      'src': [
        `${gulp.config('root.src')}/docui/index.html`
      ],
      'dest': `${gulp.config('root.dist')}`
    }
  ]
}
