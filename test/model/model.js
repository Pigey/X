var Promise = require('promise')
    promise = function(handler){
    return new Promise(handler);
},
    log = console.log.bind(console, '*');

var Model = require('../../model/method');

var col = 'test',
    token = '57d9620b7406041429ab3fa733fe9cca';

promise(function(resolve, reject){

    resolve('start');

}).then(function(){

    return promise(function(resolve, reject){
        Model.create(token, col, [
            {
                name: 'test1',
                num: 1
            },
            {
                name: 'test1',
                num: 1
            },
            {
                name: 'test2',
                num: 2
            }
        ], function(err, res1, res2){
            log('create', err, res1, res2);

            if(err) reject(err);
            else resolve(res1, res2);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.list(token, col, function(err, res){
            log('list', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.list(token, col, {}, 'name', function(err, res){
            log('list name', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.distinct(token, col, 'name', function(err, res){
            log('distinct name, all', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.distinct(token, col, 'num', {
            name: 'test1'
        }, function(err, res){
            log('distinct num, test1', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.get(token, col, {
            name: 'test1'
        }, function(err, res){
            log('get test1', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.update(token, col, {
            num: 'new'
        }, function(err, res){
            log('update all', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.get(token, col, {
            name: 'test1'
        }, function(err, res){
            log('get test1', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.remove(token, col, {
            name: 'test1'
        }, function(err, res){
            log('remove test1', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.list(token, col, {
        }, function(err, res){
            log('list', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.remove(token, col, {
        }, function(err, res){
            log('remove all', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.list(token, col, {
        }, function(err, res){
            log('list', err, res);

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


