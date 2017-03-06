var webpack = require("webpack");

module.exports = [
  {
    entry: "./src/json-patch-ot.js",
    output: {
      filename: "dist/json-patch-ot.min.js",
      library: "JSONPatchOT",
      libraryTarget: "var"
    },
    resolve: {
      extensions: [".js"]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  },
  {
    entry: "./src/json-patch-ot.js",
    output: {
      filename: "dist/json-patch-ot.js",
      library: "JSONPatchOT",
      libraryTarget: "commonjs2"
    },
    resolve: {
      extensions: [".js"]
    }
  }
];
