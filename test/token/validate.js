var validate = require('../../auth/validate');

var test = function(access){
	validate(access, function(err, result){
	    console.log(access, err, result);
	});
};

test('84054ce010d1ab12ad08dbf0a29e495b');
test('84054ce010d1ab12ad08dbf0a29e495c');