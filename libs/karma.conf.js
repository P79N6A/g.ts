const {join} = require('path');
const {constants} = require('karma');

module.exports = (config) => {
  config.set({
    // basePath: join(__dirname, '..'),
    frameworks: ['jasmine'],
    files: [{pattern: 'test.ts', watched: false}],
    preprocessors: {'test.ts': ['webpack', 'sourcemap']},
    webpack: [
      {
        devtool: 'inline-source-map',
        resolve: {
          extensions: ['.js', '.ts', '.tsx']
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              exclude: [/node_modules/],
              loader: "ts-loader",
              options: {
                context: __dirname,
                configFile: join(__dirname, "tsconfig.spec.json")
              }
            }
          ]
        },

        optimization: {
          // We no not want to minimize our code.
          minimize: false
        },

        stats: {
          colors: true,
          modules: true,
          reasons: true,
          errorDetails: true
        },
      }
    ],

    client: {
      clearContext: false
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: constants.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
};
