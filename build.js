var fs = require('fs');
require('string.fromcodepoint');

var db = fs.readFileSync(__dirname + '/8.0.0-database.txt');
db = db.toString().split('\n').filter(function (row) {
  var split = row.split(';');
  if (split[1] && split[1][0] !== '<') {
    return true;
  } else {
    return false;
  }
}).map(function (line) {
  var split = line.split(';');
  split[1] = split[1] || '';
  return {
    code: split[0],
    name: split[1].toLowerCase(),
    char: String.fromCodePoint(parseInt(split[0],16))
  };
});

process.stdout.write(JSON.stringify(db));
