const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, default: '' },
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'images' }
});

module.exports = mongoose.model('User', UserSchema);
