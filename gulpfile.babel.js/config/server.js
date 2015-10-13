import gulp from 'gulp'

export default ()=> {
  return {
    src: [
      `${gulp.config('root.dist')}/{,**/}*.*`
    ],
    options: {
      notify: false,
      logSnippet: false,
      snippetOptions: {
        ignorePaths: 'index.html'
      },
      port: 3001,
      proxy: 'http://localhost:3000',
      ui: {
        port: 9999
      }
    }
  }
}
