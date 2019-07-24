module.exports = function(res){
	console.log('404 served from notFoundHandler');
	res.statusCode = 404;
	res.end();
};