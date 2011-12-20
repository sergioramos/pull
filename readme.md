# pull
Little tool to pull repos from git built on top of gits. It was built to provide an API similiar to arca

## installation
	npm install pull

## usage
	pull = require('pull');
	
	pull.set('git@github.com:ramitos/blog.git');
	
	pull.sync(function (e, path) {
		if(!e) {
			console.log('files downloaded to ' + path);
		}
	});