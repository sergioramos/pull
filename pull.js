var exec  = require('child_process').exec,
		file = require('file'),
		fs = require('fs');

var git = function() {}

git.prototype.set = function (repo, folder) {
	this.repo = repo
	this.folder = folder
	var self = this
	
	this.folderExists(this.folder, function (exists) {
		if(exists) return self.isRepo(function (repo) {
			if(repo & (repo.url !== self.repo)) throw new Error(self.folder + ' is already a repo')
		})
		
		fs.mkdir(self.folder)	
	})

	return this
}

git.prototype.folderExists = function (folder, callback) {
	fs.stat(folder, function (e, stat) {
		if(e & (e.code === 'ENOENT')) return callback(false)
		if(e) throw e
		if(stat.isDirectory()) return callback(true)
		callback(false)
	})
}

git.prototype.isRepo = function (callback) {
	this.folderExists(file.path.join(this.folder, '.git'), function (exists) {
		if(exists) return fs.readFile(file.path.join(self.folder, '.git/config'), 'utf-8', function (e, data) {
			if(e) throw e
			callback({
				remote: data.match(/\[remote \"(.*)\"\]/)[1],
				branch: data.match(/\[branch \"(.*)\"\]/)[1],
				url: data.match(/url \= (.*)\s/)[1]
			})
		})
		
		callback(null)
	})
}

git.prototype.isEmpty = function (callback) {
	fs.readdir(this.folder, function (e, files) {
		if(e) throw e
		callback(files.length === 0)
	})
}

git.prototype.sync = function () {
	var self = this
	this.isRepo(function (repo) {
		if(!repo) return exec('git clone ' + self.repo + ' ' + self.folder)
		exec('cd ' + self.folder + '; git pull')
	})
}

module.exports = new git()