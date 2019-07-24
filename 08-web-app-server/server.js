const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');


/*
dataParser.js
serveStatic.js
serveCalculator.js
notFoundHandler.js

*/
const portNumber = 8080;

let staticResExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	let resExtn = path.extname(resourceName);
	return staticResExtns.indexOf(resExtn) >= 0;
}

const server = http.createServer((req, res) => {
	
	console.log(`${req.method}\t${req.url}`);
	const urlObj = url.parse(req.url),
		resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;

	if (isStatic(resourceName)){
		let resourceFullName = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourceFullName)){
			res.statusCode = 404;
			res.end();
			return;
		}

		const stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);

		stream.on('error', (err) => {
			console.log(err);
			res.statusCode = 500;
			res.end();
		});
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		const queryData = querystring.parse(urlObj.query),
			op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2),
			result = calculator[op](n1, n2);

		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		let rawData = '';
		req.on('data', chunk => rawData += chunk);
		req.on('end', () => {
			const bodyData = querystring.parse(rawData),
				op = bodyData.op,
				n1 = parseInt(bodyData.n1),
				n2 = parseInt(bodyData.n2),
				result = calculator[op](n1, n2);

			res.write(result.toString());
			res.end();
		})
	} else {
		res.statusCode = 404;
		res.end();
		return;
	}

});

server.listen(portNumber);

server.on('listening' , () => console.log(`server listening on ${portNumber}`));