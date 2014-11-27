var mongo = require('../db/mongo'),
    types = require('../db/types');

var createModel = function(name){
    var schema = mongo.schema({}, { strict: false }),
        model = mongo.model(name, schema);

    ['create', 'update', 'remove'].forEach(function(op){
        model.on(op, function(){
            model.emit('change', {
                type: op,
                data: Array.prototype.slice.call(arguments)
            });
        });
    });

    return model;
};

var getModel = function(name, tokenId){
    name = name + '_' + tokenId;

    return mongo.db.models[name] ?
        mongo.model(name) :
        createModel(name);
};

module.exports = {
    get: getModel
};