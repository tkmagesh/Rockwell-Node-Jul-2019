const fs = require('fs'),
	path = require('path'),
	filePath = path.join(__dirname, '../data/taskData.json');

function getData(callback){
	fs.readFile(filePath, { encoding : 'utf8'}, (err, fileContents) => {
		//check the error;
		let data = JSON.parse(fileContents);
		callback(data);
	});
}

module.exports = { getData };