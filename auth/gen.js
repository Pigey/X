var Token = require('./token');

var gen = function(callback){
    // TODO: update generate method
    var secretToken = Date.now().toString(),
        accessToken = secretToken.slice(0, 5);

    var token = new Token({
        access: accessToken,
        secret: secretToken
    });

    token.save(function(err){
        callback(err, token);
    });
};

module.exports = gen;