const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  telefono: {
    type: String,
  }
});

module.exports = mongoose.model('Contact', contactSchema);