var fs = require('fs');
var payloadIndex = -1;

process.argv.forEach(function(val, index, array) {
  if(val == "-payload") {
    payloadIndex = index + 1;
  }
});

if(payloadIndex > 0) {
  var data = fs.readFileSync(process.argv[payloadIndex]);
  module.exports = JSON.parse(data);
}
