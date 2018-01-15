var path = require('path');
var glob = require('glob');

module.exports = {
	entry: {
		app: './js/app/app.js',
		components: glob.sync('./js/app/**/*.js'),
		vendor: glob.sync('./js/vendor/*.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	}
}