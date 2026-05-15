const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: String, default: '' },
  gender: { type: String, default: '' },
  contactNumber: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  type: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);