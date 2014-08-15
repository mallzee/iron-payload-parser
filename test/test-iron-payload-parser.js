var PayloadParser = require('../lib/iron-payload-parser');

exports['no payload loaded'] = function(test){

    test.expect(1);
    test.throws(function() {
        var payload = PayloadParser(['differentRequiredVariable']);
    }, Error, "The payload should throw because there is no payload");
    test.done();
};


exports['required variable in payload'] = function(test){
	// Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    // Set up the parser
    var payload = PayloadParser(['requiredVariable']);

    test.expect(2);
    test.ok(payload.requiredVariable, "The payload should have a required value");
    test.strictEqual(payload.requiredVariable, 'requiredValue', "The payload's required key's value should be correct");
    test.done();
};

exports['optional payload using default'] = function(test){
	// Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    // Set up the parser
    var payload = PayloadParser( {optionalVariable:'default value'} );

    test.expect(2);
    test.ok(payload.optionalVariable, "The payload should have an optional value");
    test.strictEqual(payload.optionalVariable, 'default value', "The payload's optional key's value should be correct");
    test.done();
};

exports['optional payload specified in payload file'] = function(test){
	// Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    // Set up the parser
    var payload = PayloadParser({anOptionalVariable:'default value'});

    test.expect(2);
    test.ok(payload.anOptionalVariable, "The payload should have an optional value");
    test.strictEqual(payload.anOptionalVariable, 'an optional value', "The payload's optional key's value should be correct");
    test.done();
};

exports['required and optional payload'] = function(test){
	// Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    // Set up the parser
    var payload = PayloadParser(['requiredVariable'], {'optionalVariable':'testValue'});

    test.expect(4);

    test.ok(payload.optionalVariable, "The payload should have an optional value");
    test.strictEqual(payload.optionalVariable, 'testValue', "The payload's optional key's value should be correct");

    test.ok(payload.requiredVariable, "The payload should have a required value");
    test.strictEqual(payload.requiredVariable, 'requiredValue', "The payload's required key's value should be correct");
    test.done();
};

exports['required payload not given'] = function(test){
	// Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    // Set up the parser

    test.expect(1);
    test.throws(function() {
    	var payload = PayloadParser(['differentRequiredVariable']);
	}, Error, "The payload should be missing a required value");
    test.done();
};

exports['required payload empty'] = function(test){
	// Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    // Set up the parser
    var payload = PayloadParser([]);

    test.expect(1);
    test.strictEqual(Object.keys(payload).length, 0, "The payload should be empty");
    test.done();
};

exports['variables are strings'] = function(test){
	// Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    // Set up the parser
    test.expect(1);

    test.throws(function() {
    	var payload = PayloadParser([{'fish':'sticks'}]);
	}, Error, "The payload should have rejected non-strings as keys");
    test.done();
};

exports['no parameters so returns full payload'] = function(test){
    // Set up the payload
    process.argv[3] = '-payload';
    process.argv[4] = process.cwd() + '/test/payloads/required-variable-payload.json';

    var payload = PayloadParser();

    test.expect(4);

    test.ok(payload.anOptionalVariable, "The payload should have an optional value");
    test.strictEqual(payload.anOptionalVariable, 'an optional value', "The payload's optional key's value should be correct");

    test.ok(payload.requiredVariable, "The payload should have a required value");
    test.strictEqual(payload.requiredVariable, 'requiredValue', "The payload's required key's value should be correct");
    test.done();
};