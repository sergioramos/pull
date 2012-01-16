/**
 * Module dependencies.
 */
var exec  = require('child_process').exec,
		file = require('file'),
		fs = require('fs');



var git = function() {};



git.prototype.set = function (repo, folder) {
	this.repo = repo;
	this.folder = folder;
	self = this;
	
	this.folderExists(self.folder, function (exists) {
		if(exists) {
			self.isRepo(function (repo) {
				if(repo) {
					if(repo.url !== self.repo) {
						throw new Error(self.folder + ' is already a repo');
					}
				}
			});
		} else {
			fs.mkdir(self.folder);
		}
	});
	
	return this;
};



git.prototype.folderExists = function (folder, callback) {
	fs.stat(folder, function (e, stat) {
		if(e) {
			if(e.code === 'ENOENT') {
				callback(false);
			} else {
				throw e;
			}
		} else if(stat.isDirectory()){
			callback(true);
		} else {
			callback(false);
		}
	});
};



git.prototype.isRepo = function (callback) {
	self.folderExists(file.path.join(self.folder, '.git'), function (exists) {
		if(exists) {
			fs.readFile(file.path.join(self.folder, '.git/config'), 'utf-8', function (e, data) {
				if(e) throw e;

				callback({
					remote: data.match(/\[remote \"(.*)\"\]/)[1],
					branch: data.match(/\[branch \"(.*)\"\]/)[1],
					url: data.match(/url \= (.*)\s/)[1]
				});
			});
		} else {
			callback(null);
		}
	});
};



git.prototype.isEmpty = function (callback) {
	fs.readdir(self.folder, function (e, files) {
		if(e) throw e;
		callback(files.length === 0);
	});
};



git.prototype.sync = function () {
	self.isRepo(function (repo) {
		if(!repo) {
			exec('git clone ' + self.repo + ' ' + self.folder);
		} else {
			exec('cd ' + self.folder + '; git pull');
		}
	});
};

module.exports = new git();