var Token = require('./token');

var randomString = require('random-string'),
    crypto = require('crypto');

var strMd5 = function(str){
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    return md5sum.digest('hex');
};

var genAll = function(callback){
    var secretToken = randomString({length: 32}),
        accessToken = calcAccess(secretToken);

    var token = new Token({
        access: accessToken,
        secret: secretToken
    });

    token.save(function(err){
        callback(err, token);
    });
};

var calcAccess = function(secretToken){
    var salt = Date.now().toString(16);
    var access = strMd5(secretToken + salt);
    return access;
};

var genAccess = function(secretToken, callback){
    Token.findOneAndUpdate({
        secret: secretToken
    }, {
        access: calcAccess(secretToken)
    }, function(err, token){
        if(err || !token){
            callback(err || 'ILLEGAL SECRET TOKEN');
        }else{
            callback(null, token.access)
        }
    });
};

module.exports = {
    all: genAll,
    access: genAccess
};