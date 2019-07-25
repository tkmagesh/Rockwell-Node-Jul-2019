const url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	const urlObj = url.parse(req.url);
	req['urlObj'] = urlObj;
	req['queryData'] = querystring.parse(req.urlObj.query);
	let rawData = '';
	req.on('data', chunk => rawData += chunk);
	req.on('end', () => {
		req['bodyData'] = querystring.parse(rawData);
		next();
	});
};