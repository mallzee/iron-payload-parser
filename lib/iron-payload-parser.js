var Args = require("vargs").Constructor;
var _ = require("underscore");
var payload;

// Try and parse the required variables
var parseRequiredVariables = function(requiredVariableArray) {
	var requiredVariables = {};

	// Check that all the keys are strings
	_.each(requiredVariableArray, function(key) {
		if(_.isString(key) === false) {
			throw new Error('"' + JSON.stringify(key) + '" is not a valid key name');
		}

		if(payload[key]) {
			requiredVariables[key] = payload[key];
		}
	});

	// Check that all the variables are present in the payload
	var missingVariables = _.difference(requiredVariableArray, Object.keys(payload));
	if(missingVariables.length > 0) {
		throw new Error('Missing values for variable(s): ' + missingVariables.join(', '));
	}

	return requiredVariables;
};

// Try and parse the optional variables
var parseOptionalVariables = function(optionalVariables) {
	var keys = Object.keys(optionalVariables);

	// Check that all the keys are strings
	_.each(keys, function(key) {
		if(_.isString(key) === false) {
			throw new Error('"' + JSON.stringify(key) + '" is not a valid key name');
		}

		if(payload[key]) {
			optionalVariables[key] = payload[key];
		}
	});

	return optionalVariables;
};

module.exports = function PayloadParser() {
	// Load the payload file here
	payload = require('./payload');

	var parsedPayload = {};

    // If required variables is an object and not an array, no required variables have been set
    var args = new(Args)(arguments);

    if(args.length === 0) {
    	console.warn("WARNING: No variables have been passed to the payload parser.")
    }

    // Get the index of the optional variables
    var optionalVarsIndex = 0;
    if(args.length > 1) {
    	optionalVarsIndex = 1;
    }

    // If the first variable is an array
    if(_.isArray(args.at(0))) {
    	parsedPayload = _.extend(parsedPayload, parseRequiredVariables(args.at(0)));
    }

    // If the first variable is an object
    if(_.isObject(args.at(optionalVarsIndex))) {
    	parsedPayload = _.extend(parsedPayload, parseOptionalVariables(args.at(optionalVarsIndex)));
    }

    return parsedPayload;
};

