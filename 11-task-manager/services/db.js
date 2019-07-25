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

/*
//Creating Promises for callback apis
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

function saveData(data){
	return new Promise((resolveFn, rejectFn) => {
		fs.writeFile(filePath, JSON.stringify(data), (err, data) => {
			resolveFn(data);	
		});
	});
}

*/
/*
//Using util.promisify
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function getData(){
	
	return readFileAsync(filePath, { encoding : 'utf8'})
		.then(fileContents => {
			//check the error;
			let data = JSON.parse(fileContents);
			return data;
		});
	
}

function saveData(data){
	return writeFileAsync(filePath, JSON.stringify(data));
}*/

//Using bluebird

const bluebird = require('bluebird');
bluebird.promisifyAll(fs);

function getData(){	
	return fs.readFileAsync(filePath, { encoding : 'utf8'})
		.then(fileContents => {
			//check the error;
			let data = JSON.parse(fileContents);
			return data;
		});
}

function saveData(data){
	return fs.writeFileAsync(filePath, JSON.stringify(data));
}

module.exports = { getData, saveData };