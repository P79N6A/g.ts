const helpers = require('./helpers');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'test');

module.exports = function (options) {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [helpers.root('libs'), 'node_modules'],
      plugins: [
        new TsConfigPathsPlugin({ configFile: helpers.root('tsconfig-spec.json') })
      ]
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: []
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                sourceMap: false,
                inlineSourceMap: true,
                compilerOptions: {
                  removeComments: true
                }
              }
            },
          ],
          exclude: [/\.e2e\.ts$/, /node_modules/]
        },
        {
          test: /\.css$/,
          loader: ['to-string-loader', { loader: 'css-loader', options: { url: false } }],
          exclude: []
        },
        {
          test: /\.scss$/,
          loader: ['raw-loader', 'sass-loader'],
          exclude: []
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: []
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: [helpers.root('libs'), helpers.root('packages')],
          exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
        }
      ]
    },

    plugins: [
      new DefinePlugin({
        ENV: JSON.stringify(ENV),
        'process.env': {
          ENV: JSON.stringify(ENV),
          NODE_ENV: JSON.stringify(ENV),
        }
      }),
      new LoaderOptionsPlugin({
        debug: false,
        options: {}
      }),
      ...options['BuildPlugins']
    ],
    performance: {
      hints: false
    },
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }
  };
};
