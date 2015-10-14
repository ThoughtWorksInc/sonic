import gulp from 'gulp'

export default {
  'files': [
    {
      'src': [
        `${gulp.config('root.src')}/**/images/*`
      ],
      'dest': `${gulp.config('root.dist')}/assets/images`
    }
  ]
}