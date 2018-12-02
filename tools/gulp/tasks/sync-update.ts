//tslint:disable
import { src, task } from 'gulp';
import { dest } from 'vinyl-fs';

const rename = require('gulp-rename');

task('sync-update', () => {
  return src(['packages/**/*.ts', '!**/*.spec.ts', '!**/public-api.ts'], {base: 'packages'})
    .pipe(rename((path) => {
      path.dirname = path.dirname.replace(/\/src/, '');
      path.extname = '.js';
      return path;
    }))
    .pipe(dest('src'));
});
