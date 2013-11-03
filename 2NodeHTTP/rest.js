/*globals require*/
'use strict';

var http = require('http');

var contacts = [
  {name: 'John Doe', age: 42},
  {name: 'Jane Doe', age: 43}
];

var server = http.createServer(function (req, res) {

  if (req.url === '/api/contacts' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(contacts));
  }

  //Other API methods...

  else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
  }
});

server.listen(1338, '127.0.0.1', function () {
  console.log('Server running at http://127.0.0.1:1338/');
});
