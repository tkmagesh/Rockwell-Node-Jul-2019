const http = require('http'),	
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler'),
	logger = require('./logger'),
	app = require('./app');

const portNumber = 8080;

app.use(dataParser);
app.use(logger);
app.use(serveStatic); 
app.use(serveCalculator); 
app.use(notFoundHandler);

//console.log(`${req.method}\t${req.url}`);

const server = http.createServer(app);

server.listen(portNumber);

server.on('listening' , () => console.log(`server listening on ${portNumber}`));