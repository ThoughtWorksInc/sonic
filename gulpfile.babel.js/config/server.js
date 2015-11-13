import gulp from 'gulp'

export default ()=> {
  return {
    src: [
      `${gulp.config('root.dist')}/{,**/}*.*`
    ],
    options: {
      server: `${gulp.config('root.dist')}`,
      notify: false,
      logSnippet: false,
      snippetOptions: {
        ignorePaths: 'index.html'
      },
      port: 3001,
      ui: {
        port: 9999
      }
    }
  }
}
