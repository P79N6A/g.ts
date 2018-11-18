const { join } = require('path');
const { constants } = require('karma');

module.exports = () => {
  return {
    basePath: '',
    frameworks: ['jasmine'],
    // ... normal karma configuration
    files: [
      // all files ending in "_test"
      // { pattern: 'test/*.spec.ts', watched: false },
      // { pattern: 'test/**/*.spec.ts', watched: false }
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      // 'test/*.spec.ts': ['webpack', 'sourcemap'],
      // 'test/**/*.spec.ts': ['webpack', 'sourcemap']
    },

    webpack: [{
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
              configFile: join(__dirname, "./tsconfig-spec.json")
            }
          }
        ]
      },

      stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      },
    }
    ],

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: constants.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  }
};
