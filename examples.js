pull = require('./pull');

pull.set('git@github.com:ramitos/blog.git');

pull.sync(function (e, path) {
	if(!e) {
		console.log('files downloaded to ' + path);
	}
});