const fs = require('fs'),
	path = require('path');

let staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	let resExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resExtn) >= 0;
}


module.exports = function(req, res, next){
	const resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;

	if (isStatic(resourceName)){
		let resourceFullName = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourceFullName)){
			res.statusCode = 404;
			res.end();
			next();
		}

		const stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);
		
		stream.on('end', () => next());

		stream.on('error', (err) => {
			console.log(err);
			res.statusCode = 500;
			res.end();
			next();
		});
	} else {
		next();
	}
}