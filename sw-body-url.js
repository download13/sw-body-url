var qs = require('querystring');

module.exports = function(opts) {
	opts = opts || {};

	var maxLength = opts.maxLength;

	return function(req, res, next) {
		if(req.header['content-type'] !== 'application/x-www-form-urlencoded') {
			next();
			return;
		}

		req.setEncoding('utf8');

		var buf = '';

		req.on('data', function(data) {
			buf += data;

			if(maxLength != null && buf.length > maxLength) {
				res.writeHead(413);
				res.end('Too much data');
				req.destroy();
				return;
			}
		}).on('end', function() {
			try {
				req.body = qs.parse(buf) || {};
			} catch(e) {
				req.body = {};
			}
			next();
		});
	}
}
