const ExitOnErrorWebpackPlugin = require('./exit-on-error-plugin');

module.exports = function (config) {
  const testWebpackConfig = require('./webpack.test.js')({
    env: 'test',
    BuildPlugins: process.env.TRAVIS ? [new ExitOnErrorWebpackPlugin()] : []
  });

  const configuration = {

    basePath: './',

    frameworks: ['jasmine'],

    exclude: [],

    client: {
      captureConsole: false
    },

    files: [
      { pattern: './config/*-test.js', watched: false },
      // { pattern: './config/packages-test.js', watched: false },
      // { pattern: './packages/*/assets/**/*', watched: false, included: false, served: true, nocache: false }
    ],

    proxies: {
      "/assets/": "/base/src/assets/"
    },

    preprocessors: { './config/*-test.js': ['coverage', 'webpack', 'sourcemap'] },

    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    webpackMiddleware: {
      logLevel: 'warn',
      stats: {
        chunks: false
      }
    },
    reporters: ['mocha', 'kjhtml', 'coverage', 'remap-coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: [
      'ChromeTravisCi'
    ],
    customLaunchers: {
      ChromeTravisCi: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    singleRun: false,
    client: {
      clearContext: false
    },
  };

  if (process.env.SONAR_QUBE) {

    configuration.sonarQubeUnitReporter = {
      sonarQubeVersion: '5.x',
      outputFile: 'reports/ut_report.xml',
      overrideTestDescription: true,
      testPath: 'libs',
      testFilePattern: '.spec.ts',
      useBrowserName: false
    };

    configuration.remapCoverageReporter.lcovonly = './coverage/coverage.lcov';

    configuration.reporters.push('sonarqubeUnit');
  }

  if (process.env.TRAVIS) {
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};
