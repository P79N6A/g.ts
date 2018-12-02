import { main } from 'gradii-g-lzeix';
import { task } from 'gulp';

task('lzeix', done => {
  const args = process.argv.slice(4);
  main(args);
  return done();
});
