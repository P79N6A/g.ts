Error.stackTraceLimit = Infinity;

var testContext = require.context('../packages/tiny/', true, /\.spec\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

var modules = requireAll(testContext);
