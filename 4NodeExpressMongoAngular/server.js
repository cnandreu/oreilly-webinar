//Dependencies
var express = require('express'),
  db = require('./db'),
  routes = require('./routes'),
  http = require('http');

//Express application
var app = express();

//Configure server
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Setup the routes
app.get('/api/contacts', routes.getAllContacts);
app.get('/api/contacts/:id', routes.getSingleContact);
app.put('/api/contacts/:id', routes.updateSingleContact);
app.post('/api/contacts', routes.addNewContact);
app.del('/api/contacts/:id', routes.removeExistingContact);

//Start the server
http.createServer(app).listen(80, function () {
  console.log('Express server listening on port 80');
  db.connect('mongodb://localhost/contacts');
});