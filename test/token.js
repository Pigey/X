var validate = require('../auth/validate');

validate('14143', function(err, result){
	console.log(err, result);
});