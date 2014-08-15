var fs = require('fs');
var querystring = require('querystring');
var params = null;
var task_id = null;
var config = null;

process.argv.forEach(function(val, index, array) {
  if (val == "-payload") {
    params = fs.readFileSync(process.argv[index + 1], 'utf8');
    try {
      params = JSON.parse(params);
    } catch(e) {
      try {
        var parsed = querystring.parse(params);
        if (!(Object.keys(parsed).length == 1 && parsed[Object.keys(parsed)[0]] == '')) {
          params = parsed
        }
      } catch(e) {

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

exports.params = params;
exports.config = config;
exports.task_id = task_id;
