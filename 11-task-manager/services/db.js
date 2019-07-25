const fs = require('fs'),
	path = require('path'),
	filePath = path.join(__dirname, '../data/taskData.json');

/*function getData(callback){
	fs.readFile(filePath, { encoding : 'utf8'}, (err, fileContents) => {
		//check the error;
		let data = JSON.parse(fileContents);
		callback(data);
	});
}*/

function getData(){

	var p = new Promise(function(resolveFn, rejectFn){
		fs.readFile(filePath, { encoding : 'utf8'}, (err, fileContents) => {
			//check the error;
			let data = JSON.parse(fileContents);
			resolveFn(data);
		});
	});
	return p;
}

module.exports = { getData };