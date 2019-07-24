const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');


const portNumber = 9090;

const server = http.createServer((req, res) => {
	
	console.log(req.url);
	const urlObj = url.parse(req.url);
	
	if (urlObj.pathname === '/calculator' && req.method === 'GET'){
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