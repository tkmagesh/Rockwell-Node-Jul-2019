const fs = require('fs');

const fileName = 'sample.txt';

const readStream = fs.createReadStream(fileName, { encoding : 'utf8'});

readStream.pipe(process.stdout);

readStream.on('end', () => console.log('Thats all folks!'));

readStream.on('end', () => console.log('Trust me, There is definitely no more data!'));