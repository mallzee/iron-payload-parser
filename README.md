#Iron.io Payload Parser
-----
A utility to help parse the payload given to an Iron.io worker. Required and optional variables can be specified.

##Installation
-----
	npm install iron-payload-parser

##Usage
-----
Sample payload file:

	{
		"requiredVar1" : "the first required value",
		"requiredVar2" : "the second required value",
		"optionalVar2" : "an optional value"
	}
-----
	var PayloadParser = require('iron-payload-parser');

	var payload = PayloadParser(
		['requiredVar1', 'requiredVar2'],
		{
			optionalVar1 : 'default value 1',
			optionalVar2: 'default value 2'
		}
	);
    
    console.log(payload.requiredVar1); // => "the first required value"
    console.log(payload.requiredVar2); // => "the second required value"
    console.log(payload.optionalVar1); // => "default value 1"
    console.log(payload.optionalVar2); // => "an optional value"