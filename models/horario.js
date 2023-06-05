const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

module.exports = mongoose.model('Horario', horarioSchema);