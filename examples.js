var pull = require('./pull'),
		file = require('file')

pull = require('pull').set('git@github.com:ramitos/blog.git', file.path.join(__dirname, 'articles'))
pull.sync()