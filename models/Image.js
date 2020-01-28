var mongoose = require('mongoose');

var ImageSchema = mongoose.Schema({
  name: String,
  data: Buffer,
  mimetype: String
});

module.exports = mongoose.model('images', ImageSchema);
