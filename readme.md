# pull
Little tool to pull repos from git. It was built to provide an API similiar to arca

## installation
	npm install pull

## usage
	pull = require('pull').set('git@github.com:ramitos/blog.git', file.path.join(__dirname, 'articles'));	
	pull.sync();