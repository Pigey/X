var model = require('./model'),
    validate = require('../auth/validate');

// model methods
var methods = {
    list: function(model, filters, callback){
        model.find(filters, function(err, list){
            if(!err) list = list.map(function(item){ return item._doc; });
            callback(err, list);
        });
    },
    get: function(model, filters, callback){
        model.findOne(filters, function(err, item){
            if(!err) item = item._doc;
            callback(err, item);
        });
    },
    create: function(model, obj, callback){
        model.create(obj, function(err, item){
            if(!err) item = item._doc;
            callback(err, item);
        });
    },
    remove: function(model, filters, callback){
        model.remove(filters, callback);
    },
    update: function(model, params, callback){
        model.update(params.filters, params.updates, { multi: true }, callback);
    }
};

// wrap methods
Object.keys(methods).forEach(function(name){

    var op = methods[name];

    methods[name] = function(modelName, params, token, callback){

        validate(token, function(err, tokenId){
            if(err || !tokenId){
                callback(err || 'ILLEGAL TOKEN');
                return;
            }

            var m = model.get(modelName, tokenId);

            op(m, params, callback);
        });
        
    };
});

module.exports = methods;