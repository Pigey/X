var Promise = require('promise')
    promise = function(handler){
    return new Promise(handler);
},
    log = console.log.bind(console, '*');

var gen = require('../../auth/gen'),
    Token = require('../../auth/token'),
    validate = require('../../auth/validate');

promise(function(resolve, reject){

    resolve('start');

}).then(function(){

    return promise(function(resolve, reject){
        gen.all(function(err, res){
            log('gen.all', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(params){

    return promise(function(resolve, reject){
        validate(params.access, function(err, res){
            log('validate', err, res);

            if(err) reject(err);
            else resolve(params);
        });
    })

}).then(function(params){

    return promise(function(resolve, reject){
        gen.access(params.secret, function(err, res){
            log('gen.access', err, res);

            params.newAccess = res;

            if(err) reject(err);
            else resolve(params);
        });
    })

}).then(function(params){

    return promise(function(resolve, reject){
        validate(params.newAccess, function(err, res){
            log('validate new', err, res);

            if(err) reject(err);
            else resolve(params);
        });
    })

}).then(function(params){

    return promise(function(resolve, reject){
        validate(params.access, function(err, res){
            log('validate old', err, res);

            if(err) reject(err);
            else resolve(params);
        });
    })

}).then(function(params){

    return promise(function(resolve, reject){
        Token.remove({
            secret: params.secret
        }, function(err, res){
            log('remove test data', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).done(function(res){
    log('finished.');
    process.exit(0);
}, function(err){
    log('failed,', err);
    process.exit(1);
})

