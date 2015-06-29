#! /usr/bin/env node

var fs = require('fs');
var db = require(__dirname + '/db.json');
var opts = require('nomnom')
  .option('all', {
    abbr: 'a',
    flag: true
  })
  .option('one', {
    abbr: 'o',
    flag: true
  })
  .option('short', {
    abbr: 's',
    flag: true
  })
  .option('json', {
    abbr: 'j',
    flag: true
  }).parse();

require('string.fromcodepoint');

var query = opts._.join(' ').toLowerCase();

if (opts.all) {
  results = db;
} else {
  var results = [];
  if (query.length) {
    for (var i=0; i < db.length; i++) {
      var row = db[i];
      if (row.name.indexOf(query) >=0) {
        results.push(row);
        if (opts.one) {
          break;
        }
      }
    }
  } else {
    var row = db[Math.random() * db.length | 0];
    results.push(row);
  }
}


if (opts.json) {
  process.stdout.write(JSON.stringify(results));
} else {
  if (opts.short) {
    results = results.map(function (row) {
      return row.char;
    });
  } else {
    results = results.map(function (row) {
      return row.char + '  ' + row.name + ' (' + row.code.toString(16) + ')';
    });
  }
  process.stdout.write(results.join(opts.short ? '' : '\n'));
}
