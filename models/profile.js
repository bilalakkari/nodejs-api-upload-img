const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Profile', profileSchema);