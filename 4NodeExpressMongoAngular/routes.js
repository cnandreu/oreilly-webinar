var db = require('./db');

//Returns all contacts or empty array
exports.getAllContacts = function (req, res) {

  db.Contact.find(function (err, contacts) {
    if (err) {
      res.json([]);
    } else {
      res.json(contacts);
    }
  });

};

//Returns single contact or empty object
exports.getSingleContact = function (req, res) {

  var id = req.params.id;

  db.Contact.findById(id, function (err, contacts) {
    if (err) {
      res.json({});
    } else {
      res.json(contacts);
    }
  });

};

//Updates a single contact and returns it, or returns empty object
exports.updateSingleContact = function (req, res) {

  var id = req.params.id,
      contactData = req.body;

  //If the client-side code sends an _id in the body, ignore it
  delete contactData._id;

  db.Contact.findByIdAndUpdate(id, contactData, function (err, contact) {
    if (err) {
      res.json({});
    } else {
      res.json(contact);
    }
  });

};

//Adds a new contact and returns it, or returns empty object
exports.addNewContact = function (req, res) {

  var contactData = req.body;

  db.Contact.create(contactData, function (err, contact) {
    if (err) {
      res.json({});
    } else {
      res.json(contact);
    }
  });

};

//Removes an existing contact and returns it, or returns empty object
exports.removeExistingContact = function (req, res) {

  var id = req.params.id;

  db.Contact.findByIdAndRemove(id, function (err, contact) {
    if (err) {
      res.json({});
    } else {
      res.json(contact);
    }
  });

};