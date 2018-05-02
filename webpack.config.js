const path = require("path");

module.exports = {
  entry: "./client/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "www")
  }
};
