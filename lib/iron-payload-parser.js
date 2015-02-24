internals = {};

var fs = require('fs');
var querystring = require('querystring');
var params = null;
var task_id = null;
var config = null;

function PayloadParser() {
    internals.extractPayload();
    var payloadData = internals.params;


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
        optionalKeysAndDefaults = arguments[0] || {};
    }

    // For each required variable, ensure the payload has it
    for (var index in requiredKeys) {
        if (payloadData && payloadData[requiredKeys[index]]) {
            payload[requiredKeys[index]] = payloadData[requiredKeys[index]];
            continue;
        }

        throw new TypeError("Please ensure the payload exists and the required variable '" + requiredKeys[index] + "' is specified in the payload!");
    }

    // For every key in the optional keys
    for (var key in optionalKeysAndDefaults) {
        if (payloadData && payloadData[key]) {
            payload[key] = payloadData[key];
            continue;
        }

        payload[key] = optionalKeysAndDefaults[key];
    }

    return payload;
}

internals.extractPayload = function() {
    process.argv.forEach(function(val, index, array) {
        if (val == "-payload") {
            try {
                params = fs.readFileSync(process.argv[index + 1], 'utf8');
                params = JSON.parse(params);
            } catch (e) {
                try {
                    var parsed = JSON.parse(process.argv[index + 1]);
                    params = parsed;
                } catch (e) {
                    try {
                        var parsed = querystring.parse(params);
                        if (!(Object.keys(parsed).length === 1 && parsed[Object.keys(parsed)[0]] === '')) {
                            params = parsed;
                        }
                    } catch (e) {                    
                        throw e;
                    }
                }
            }
        }

        if (val == "-config") {
            config = JSON.parse(fs.readFileSync(process.argv[index + 1], 'utf8'));
        }

        if (val == "-id") {
            task_id = process.argv[index + 1];
        }
    });

    internals.params = params;
    internals.config = config;
    internals.task_id = task_id;
};

exports = module.exports = PayloadParser;