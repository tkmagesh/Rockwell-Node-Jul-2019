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
	console.log(`IO read count = ${readCount}`);
});

readStream.on('error', (err) => {
	console.log(err);
});

