var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var typeMap = {
	'String': String,
	'Number': Number,
	'Boolean': Boolean,
	'Array': Array,
	//'Buffer' Buffer,
	'Date': Date,
	'ObjectId': Schema.Types.ObjectId,
	'Mixed': Schema.Types.Mixed
};

module.exports = typeMap;