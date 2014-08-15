internals = {};

function PayloadParser() {
	var payloadData = require('./payload');
	var requiredKeys = [];
	var optionalKeysAndDefaults = {};

	var payload = {};

	// If no arguments are specified, return the raw payload
	if (arguments.length === 0 || arguments[0] === null) {
		return payloadData;
	}

	// If the first argument is an array, these are required variables
	if (Array.isArray(arguments[0])) {
		requiredKeys = arguments[0];
		optionalKeysAndDefaults = arguments[1];
	} else {
		optionalKeysAndDefaults = arguments[0];
	}

	// If the first argument is an object, these are the optional variables
	// if (typeof arguments[0] === 'object') {
	// }

	// For each required variable, ensure the payload has it
	for (var index in requiredKeys) {
		if (payloadData[requiredKeys[index]]) {
			payload[requiredKeys[index]] = payloadData[requiredKeys[index]];
			continue;
		}

		throw new TypeError("Please ensure the required variable '" + requiredKeys[index] + "' is specified in the payload!");
	}

	// For every key in the optional keys
	for (var key in optionalKeysAndDefaults) {
		if (payloadData[key]) {
			payload[key] = payloadData[key];
			continue;
		}

		payload[key] = optionalKeysAndDefaults[key];
	}

	return payload;
};

exports = module.exports = PayloadParser;

// // Try and parse the required variables
// var parseRequiredVariables = function(requiredVariableArray) {
// 	var requiredVariables = {};

// 	// Check that all the keys are strings
// 	_.each(requiredVariableArray, function(key) {
// 		if(_.isString(key) === false) {
// 			throw new Error('"' + JSON.stringify(key) + '" is not a valid key name');
// 		}

// 		if(payload[key]) {
// 			requiredVariables[key] = payload[key];
// 		}
// 	});

// 	// Check that all the variables are present in the payload
// 	var missingVariables = _.difference(requiredVariableArray, Object.keys(payload));
// 	if(missingVariables.length > 0) {
// 		throw new Error('Missing values for variable(s): ' + missingVariables.join(', '));
// 	}

// 	return requiredVariables;
// };

// // Try and parse the optional variables
// var parseOptionalVariables = function(optionalVariables) {
// 	var keys = Object.keys(optionalVariables);

// 	// Check that all the keys are strings
// 	_.each(keys, function(key) {
// 		if(_.isString(key) === false) {
// 			throw new Error('"' + JSON.stringify(key) + '" is not a valid key name');
// 		}

// 		if(payload[key]) {
// 			optionalVariables[key] = payload[key];
// 		}
// 	});

// 	return optionalVariables;
// };

// module.exports = function PayloadParser() {
// 	// Load the payload file here
// 	payload = require('./payload');

// 	var parsedPayload = {};

//     // If required variables is an object and not an array, no required variables have been set
//     var args = new(Args)(arguments);

//     if(args.length === 0) {
//     	console.warn("WARNING: No variables have been passed to the payload parser.")
//     }

//     // Get the index of the optional variables
//     var optionalVarsIndex = 0;
//     if(args.length > 1) {
//     	optionalVarsIndex = 1;
//     }

//     // If the first variable is an array
//     if(_.isArray(args.at(0))) {
//     	parsedPayload = _.extend(parsedPayload, parseRequiredVariables(args.at(0)));
//     }

//     // If the first variable is an object
//     if(_.isObject(args.at(optionalVarsIndex))) {
//     	parsedPayload = _.extend(parsedPayload, parseOptionalVariables(args.at(optionalVarsIndex)));
//     }

//     return parsedPayload;
// };

