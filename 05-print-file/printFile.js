const fs = require('fs');

const fileName = 'sample1.txt';

fs.readFile(fileName, { encoding : 'utf8'}, function(err, fileContents){
	if (err){
		console.log(err);
		return;
	}
	console.log(fileContents);
	console.log('That all folks!!');
});



