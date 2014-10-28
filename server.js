var http = require('http'),
	shoe = require('shoe'),
	dnode = require('dnode');

var methods = require('./model/method'),
	config = require('./config/server.json');

var server = http.createServer();
server.listen(config.port);

var sock = shoe(function (stream) {
    var d = dnode(methods);
    d.pipe(stream).pipe(d);
});

sock.install(server, config.path);