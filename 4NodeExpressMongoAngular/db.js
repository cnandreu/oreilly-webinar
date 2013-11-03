//Dependencies
var mongoose = require('mongoose');

//Contact Model
var ContactSchema = new mongoose.Schema({ name: String, age: Number });
exports.Contact = mongoose.model('Contact', ContactSchema);

//Connect to the MongoDB Server
exports.connect = function (url) {
  mongoose.connect(url, function (err) {
    if (err) {
      console.log('[MongoDB]',err);
      process.exit(1);
    }
    console.log('Connected to the MongoDB Server');
  });

};