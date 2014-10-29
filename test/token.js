var gen = require('../auth/gen'),
    validate = require('../auth/validate');

validate('84054ce010d1ab12ad08dbf0a29e495b', function(err, result){
    console.log(err, result);
});

/*gen.all(function(err, result){
    console.log('gen all', err, result);

    var secret = result.secret,
        access = result.access;

    validate(access, function(err, result){
        console.log('validate', err, result);

        gen.access(secret, function(err, newAccess){
            console.log('gen access', err, newAccess);

            validate(newAccess, function(err, result){
                console.log('validate new', err, result);
            });

            validate(access, function(err, result){
                console.log('validate old', err, result);
            });
        });
    });
});*/