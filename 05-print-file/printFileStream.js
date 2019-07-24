const fs = require('fs');

const fileName = 'sample.txt';

const readStream = fs.createReadStream(fileName, { encoding : 'utf8'});

//open, data, close, end, error -> events

let readCount = 0;

readStream.on('data', data => {
	++readCount;
	console.log(data);
});

readStream.on('end', () => {
	console.log('Thats all folks!!');
});

/*readStream.on('end', () => {
	throw new Error('Some intentional error');
});*/

readStream.on('end', () => {
	console.log(`IO read count = ${readCount}`);
});

readStream.on('error', (err) => {
	console.log('something went wrong');
	console.log(err);
});

process.on('uncaughtException', (err, origin) => {
	console.log('handling exception at the process level');
});
