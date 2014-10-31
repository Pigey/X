var model = require('./model'),
    validate = require('../auth/validate');

// model methods
var methods = {
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
    update: function(model, params, callback){
        model.update(params.filters, params.updates, callback);
    },
    exec: function(model, params, callback){
        var method = params.method,
            args = (Array.isArray(params.args) ? args : [args]).concat(callback);

        model[method].apply(model, args);
    }
};

// wrap methods
Object.keys(methods).forEach(function(name){

    var op = methods[name];

    methods[name] = function(modelName, params, schema, token, callback){

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

module.exports = methods;