var mongoose = require('mongoose'),
    config = require('../config/db.json');

var Schema = mongoose.Schema;

var constructUrl = function(opt){
    var url = 'mongodb://';

    if(opt.user){
        url += opt.user + ':' + opt.password + '@';
    }
    url += opt.domain;
    if(opt.port){
        url += ':' + opt.port;
    }
    url += '/' + opt.db;

    return url;
};

mongoose.connect(constructUrl(config));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('db connected!');
});

module.exports = {

    db: db,

    schema: function(obj, opt){
        return new Schema(obj, opt);
    },

    model: function(name, schema){
        return mongoose.model(name, schema);
    }
};