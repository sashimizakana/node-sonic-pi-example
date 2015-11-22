var osc = require('node-osc');
var fs = require('fs');

var note = fs.readFileSync('note.txt','utf-8');

var client = new osc.Client('127.0.0.1', 4557);
//client.send('/exit');
client.send('/run-code', note);
