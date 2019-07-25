const chalk = require('chalk');

module.exports = function(req, res, next){
	let logString = `${chalk.blue(req.method)}\t${chalk.red(req.urlObj.pathname.padEnd(30, ' '))}`;
	let startTime = new Date();
	res.on('finish', () => {
		let endTime = new Date(),
			delta = endTime - startTime;
			logString += `${chalk.green(res.statusCode)}\t${chalk.inverse(delta)}ms`;
		console.log(logString);
	});
	next();
}