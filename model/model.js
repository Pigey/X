var mongo = require('../db/mongo'),
    types = require('../db/types');

var getModel = function(name, schema, token){
    name = name + '_' + token;

    if(mongo.db.models[name]){
        return mongo.model(name);
    }else{
        if(schema){
            Object.keys(schema).forEach(function(field){
                schema[field] = types[schema[field]] || types.Mixed;
            });

            schema = mongo.schema(schema);

            return mongo.model(name, schema)
        }else{
            return null;
        }
    }
};

module.exports = {
    get: getModel
};