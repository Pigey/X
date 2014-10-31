var http = require('http'),
    shoe = require('shoe'),
    dnode = require('dnode');

var config = require('./config/server.json'),
    server = http.createServer();

// exported methods
var methods = {
    model: require('./model/method')
};

// http server
server.listen(config.port);

console.log('* server listening :' + config.port);

// install socket & pipe dnode
shoe(
    function (stream) {
        var d = dnode(methods, { weak: false });
        d.pipe(stream).pipe(d);
    }
).install(
    server,
    config.path
);

console.log('* X service binded on ' + config.path);
