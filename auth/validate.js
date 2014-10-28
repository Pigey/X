var Token = require('./token');

var validate = function(accessToken, callback){
    Token.findOne({
        access: accessToken
    }, function(err, token){
        callback(err, !!token);
    });
};

module.exports = validate;