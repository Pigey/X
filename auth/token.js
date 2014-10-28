var mongo = require('../db/mongo');

var tokenSchema = mongo.schema({
    access: String,
    secret: String
});

var Token = mongo.model('Token', tokenSchema);

module.exports = Token;