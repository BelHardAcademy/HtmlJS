var path = require('path')
var webpack = require('webpack')
var glob = require("glob");

module.exports = {
    entry: {
        app: './js/app/app.js',
        components: glob.sync("./js/app/**/*.js"), 
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
          {
              loader: 'babel-loader',
              include: [
                path.resolve(__dirname, "js/app")
              ],
              test: /\.js$/
          }
        ]        
    }
}