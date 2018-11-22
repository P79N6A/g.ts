const { join,resolve } = require('path')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./libs/test.ts",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@gradii/color": resolve(__dirname, "./color")
    }
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
};
