const path = require("path");

module.exports = {
  entry: "./client/index.js",
  mode: process.env.NODE_ENV,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "www")
  }
};
