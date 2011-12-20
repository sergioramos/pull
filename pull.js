var git = require('gits'),
		d = require('d')('pull', 'blue', 'development'),
		target = __dirname + '/.git/',
		origin = '',
		branch = 'master';


git.debug('production');
		
module.exports.set = function (l) {
	origin = l;
};

module.exports.sync = function (cb) {
	/* debug */ d('preparing to pull from' + origin);
	
	//Sync with git
	git.bsync(origin, target, [branch], '', function(e, results) {
		if(!e) {
			/* debug */ d('pull from ' + origin + 'succeed');
			cb(null, target + '/' + branch);
		} else {
			/* debug */ d('error pulling from ' + origin + ' : ' + e, 'error');
			cb(e, null);
		}
	});
}