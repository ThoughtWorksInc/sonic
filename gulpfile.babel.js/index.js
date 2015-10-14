import gulp from 'gulp'
import requireDir from 'require-dir'
import gulpTaskConfig from './libs/gulp-task-config'

gulpTaskConfig(gulp);

requireDir('./tasks', {recurse: true});

// gulp.config('root.shared', 'shared');
gulp.config('root.src', 'src');
gulp.config('root.dist', 'public');

gulp.config('tasks', requireDir('./config', {recurse: true}));

gulp.config('tasks.build', {
  taskQueue: [
    'clean',
    'symlink',
    'copy',
    'jade',
    'stylus',
    'browserify'
  ].concat(
    process.env.NODE_ENV === 'production' ? [
      'rev'
    ] : [])
});

gulp.task('dev', () => {
  gulp.config(gulp.DEV_MODE, true);
  gulp.start(['build', 'server'])
});

gulp.task('default', ['build']);
