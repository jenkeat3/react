var express = require('express'),
	app = express(),
	path = require('path');


app.use(express.static('.'));
//app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


app.get('/', function(req, res){
	res.send('Hello World!');
});


var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('App Listening at http://%s:%s', host, port)
});