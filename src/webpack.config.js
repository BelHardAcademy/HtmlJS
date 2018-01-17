var path = require('path');
var glob = require("glob");
var webpack = require("webpack");

module.exports = {
    entry: {
        app: './js/app/app.js',
        components: glob.sync("./js/app/*/*.js"),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    }
}