/*global require*/
'use strict';

var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
});

server.listen(1337, '127.0.0.1', function () {
  console.log('Server running at http://127.0.0.1:1337/');
});
