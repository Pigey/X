var Promise = require('promise')
    promise = function(handler){
    return new Promise(handler);
},
    log = console.log.bind(console, '*');

var Model = require('../../model/method');

var col = 'test',
    token = '84054ce010d1ab12ad08dbf0a29e495b';

promise(function(resolve, reject){

    resolve('start');

}).then(function(){

    return promise(function(resolve, reject){
        Model.create(col, {
            name: 'test1',
            seq: {
                a: 1
            }
        }, token, function(err, res){
            log('create', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.list(col, {
        }, token, function(err, res){
            log('list', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.get(col, {
            name: 'test1'
        }, token, function(err, res){
            log('get', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.update(col, {
            filters: {
                name: 'test1'
            },
            updates: {
                seq: {
                    a: 1,
                    b: 2
                }
            }
        }, token, function(err, res){
            log('update', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.get(col, {
            name: 'test1'
        }, token, function(err, res){
            log('get', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.remove(col, {
            name: 'test1'
        }, token, function(err, res){
            log('remove', err, res);

            if(err) reject(err);
            else resolve(res);
        });
    })

}).then(function(){

    return promise(function(resolve, reject){
        Model.list(col, {
        }, token, function(err, res){
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


