var Model = require('./model'),
    validate = require('../auth/validate');

var getDoc = function(item){
    if(item && item.toObject){
        item = item.toObject();
        delete item.__v;
        return item;
    }
    return null;
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

        this.find(filters, fields, options, function(err, list){
            if(!err) list = list.map(function(item){ return getDoc(item); });
            cb && cb(err, list);
        });
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

        this.findOne(filters, fields, options, function(err, item){
            if(!err) item = getDoc(item);
            cb && cb(err, item);
        });
    },

    distinct: function(field, filters, cb){
        if(typeof filters === 'function'){
            cb = filters;
            filters = {};
        }

        this.distinct(field, filters, cb);
    },

    create: function(item, cb){
        var model = this;

        this.create(item, function(err){
            var items = err ? [] : Array.prototype.slice.call(arguments, 1).map(getDoc);

            !err && model.emit.apply(model, ['create'].concat(items));
            cb && cb.apply(this, [err].concat(items));
        });
    },

    remove: function(filters, cb){
        if(typeof filters === 'function'){
            cb = filters;
            filters = {};
        }

        var model = this;
        this.remove(filters, function(err, affected){
            !err && model.emit('remove', affected);
            cb && cb.apply(this, arguments);
        });
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

        var model = this;
        this.update(filters, updates, options, function(err, affected){
            !err && model.emit('update', affected);
            cb && cb.apply(this, arguments);
        });
    },

    on: function(event, cb){
        this.on(event, cb);
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