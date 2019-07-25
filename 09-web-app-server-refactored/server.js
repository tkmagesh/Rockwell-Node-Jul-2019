const http = require('http'),
	path = require('path'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler'),
	logger = require('./logger'),
	app = require('./app');

const portNumber = 8080;

app.use(dataParser);
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public'))); 
app.use(serveCalculator); 
app.use(notFoundHandler);

//console.log(`${req.method}\t${req.url}`);

const server = http.createServer(app);

server.listen(portNumber);

server.on('listening' , () => console.log(`server listening on ${portNumber}`));