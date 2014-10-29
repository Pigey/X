var model = require('./model'),
    validate = require('../auth/validate');

var methods = {
    model: {
        list: function(model, filters, callback){
            model.find(filters, callback);
        },
        get: function(model, filters, callback){
            model.findOne(filters, callback);
        },
        create: function(model, obj, callback){
            (new model(obj)).save(callback);
        },
        remove: function(model, filters, callback){
            model.remove(filters, callback);
        },
        exec: function(model, params, callback){
            var method = params.method,
                args = (Array.isArray(params.args) ? args : [args]).concat(callback);

            model[method].apply(model, args);
        }
    },
    instance: {}
};

Object.keys(methods.model).forEach(function(name){

    var op = methods.model[name];

    methods.model[name] = function(modelName, params, schema, token, callback){
        console.log('?', arguments);

        validate(token, function(err, tokenId){
            if(err || !tokenId){
                callback(err || 'ILLEGAL TOKEN');
                return;
            }

            var m = model.get(modelName, schema, tokenId);

            if(!m){
                callback('SCHEMA REQUIRED');
                return;
            }

            op(m, params, callback);
        });
        
    };
});

Object.keys(methods.instance).forEach(function(name){});

module.exports = methods;