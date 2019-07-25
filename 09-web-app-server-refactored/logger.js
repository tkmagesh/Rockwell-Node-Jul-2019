module.exports = function(req, res, next){
	let logString = `${req.method}\t${req.urlObj.pathname}`;
	let startTime = new Date();
	res.on('finish', () => {
		let endTime = new Date(),
			delta = endTime - startTime;
			logString += `\t\t${res.statusCode}\t${delta}ms`;
		console.log(logString);
	});
	next();
}