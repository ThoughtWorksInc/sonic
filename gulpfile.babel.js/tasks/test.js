import gulp from 'gulp';
import gulpMocha from 'gulp-spawn-mocha';

const TASK_NAME = 'test';

function testOnce(conf) {
  return gulp.src(conf.src, {read: false})
    .pipe(gulpMocha(conf.options));
}

function test() {
  return gulp.autoRegister(TASK_NAME, testOnce);
}

gulp.task(TASK_NAME, test);

export default test;