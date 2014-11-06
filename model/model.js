var mongo = require('../db/mongo'),
    types = require('../db/types');

var getModel = function(name, tokenId){
    name = name + '_' + tokenId;

    if(mongo.db.models[name]){
        return mongo.model(name);
    }else{
        var schema = mongo.schema({}, { strict: false });

        return mongo.model(name, schema)
    }
};

module.exports = {
    get: getModel
};