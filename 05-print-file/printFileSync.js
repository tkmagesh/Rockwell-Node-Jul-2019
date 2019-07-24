const fs = require('fs');

const fileName = 'sample.txt';

const fileContents = fs.readFileSync(fileName, { encoding : 'utf8'});

console.log(fileContents);

console.log('That all folks!!');