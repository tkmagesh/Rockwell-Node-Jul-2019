const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');


const portNumber = 8080;

/*
	req -> IncomingMessage (Readable Stream)
	res -> ServerResponse (Writable Stream)
*/
const server = http.createServer((req, res) => {
	
	console.log(req.url);
	const urlObj = url.parse(req.url);
	let resourceFullName = path.join(__dirname, urlObj.pathname);
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
});

server.listen(portNumber);

server.on('listening' , () => console.log(`server listening on ${portNumber}`));