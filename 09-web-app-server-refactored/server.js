const http = require('http'),	
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator');
	notFoundHandler = require('./notFoundHandler');

const portNumber = 8080;

const server = http.createServer((req, res) => {
	console.log(`${req.method}\t${req.url}`);
	dataParser(req);
	serveStatic(req, res);
	serveCalculator(req, res);
	notFoundHandler(res);
});

server.listen(portNumber);

server.on('listening' , () => console.log(`server listening on ${portNumber}`));