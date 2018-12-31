Error.stackTraceLimit = Infinity;

require('core-js/es7/reflect');

var testContext = require.context('../packages/tiny/', true, /\.spec\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var modules = requireAll(testContext);
