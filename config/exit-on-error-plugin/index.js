class ExitOnErrorWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("ExitOnErrorWebpackPlugin", stats => {
      if (stats && stats.hasErrors()) {
        stats.toJson().errors.forEach(err => {
          console.error(err);
        });
        process.exit(1);
      }
    });
  }
}

module.exports = ExitOnErrorWebpackPlugin;
