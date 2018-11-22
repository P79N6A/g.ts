// require all modules ending in "_test" from the
// current directory and all subdirectories

declare var __karma__: any;
declare var require: any;

__karma__.loaded = function () {};

(() => {
  const testsContext = require.context('.', true, /.spec.ts$/)

  testsContext.keys().forEach(testsContext)
})()

__karma__.start();
