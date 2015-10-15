import gulp from 'gulp'

export default  {
  'entry': `${gulp.config('root.src')}/*.jade`,
  'src': [
    `${gulp.config('root.src')}/*.jade`
  ],
  'dest': `${gulp.config('root.dist')}`,
  'options': {
    'pretty': true,
    'data': {
      env: process.env.NODE_ENV,
      build: process.env.JOB_NAME || 'local',
      commit: process.env.GIT_COMMIT || 'dev'
    }
  }
}
