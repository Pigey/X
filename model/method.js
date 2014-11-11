var Model = require('./model'),
    validate = require('../auth/validate');

var getDoc = function(item){
    item = item.toObject();
    delete item.__v;
    return item;
};

// transform result (item) brefore callback
var processItem = function(callback){
    return function(err){
        var args = [err];
        if(!err){
            for(var i = 1; i < arguments.length; i++){
                args.push(getDoc(arguments[i]));
            }
        }

        callback && callback.apply(this, args);
    };
};

// transform result (list) brefore callback
var processList = function(callback){
    return function(err, list){
        if(!err) list = list.map(function(item){ return getDoc(item); });
        callback && callback(err, list);
    };
};

// model methods
var methods = {

    list: function(filters, fields, options, cb){
        if(typeof filters === 'function'){
            cb = filters;
            filters = {};
            fields = null;
            options = null;
        }else if(typeof fields === 'function'){
            cb = fields;
            fields = null;
            options = null;
        }else if(typeof options === 'function'){
            cb = options;
            options = null;
        }

        this.find(filters, fields, options, processList(cb));
    },

    get: function(filters, fields, options, cb){
        if(typeof filters === 'function'){
            cb = filters;
            filters = {};
            fields = null;
            options = null;
        }else if(typeof fields === 'function'){
            cb = fields;
            fields = null;
            options = null;
        }else if(typeof options === 'function'){
            cb = options;
            options = null;
        }

        this.findOne(filters, fields, options, processItem(cb));
    },

    distinct: function(field, filters, cb){
        if(typeof filters === 'function'){
            cb = filters;
            filters = {};
        }

        this.distinct(field, filters, cb);
    },

    create: function(item, cb){
        this.create(item, processItem(cb));
    },

    remove: function(filters, cb){
        if(typeof filters === 'function'){
            cb = filters;
            filters = {};
        }

        this.remove(filters, cb);
    },

    update: function(filters, updates, options, cb){
        if(typeof filters === 'function'){
            cb = filters;
            filters = {};
            updates = null;
            options = null;
        }else if(typeof updates === 'function'){
            cb = updates;
            updates = filters;
            filters = {};
            options = null;
        }else if(typeof options === 'function'){
            cb = options;
            options = null;
        }

        options = options || { multi: true };

        this.update(filters, updates, options, cb);
    }
};

// wrap methods
Object.keys(methods).forEach(function(name){

    var op = methods[name];

    methods[name] = function(token, modelName){

        var args = Array.prototype.slice.call(arguments, 2);
            callback = args[args.length - 1];

        callback = typeof callback === 'function' ? callback : null;

        validate(token, function(err, tokenId){
            if(err || !tokenId){
                callback && callback(err || 'ILLEGAL TOKEN');
                return;
            }

            var model = Model.get(modelName, tokenId);

            op.apply(model, args);
        });
        
    };
});

module.exports = methods;