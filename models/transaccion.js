const mongoose = require('mongoose');

// Definir el esquema para los gastos e ingresos
const transactionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  categoria: {
    type: String,
  },
  tipo: {
    type: String,
  }
});

// Crear un modelo para los gastos e ingresos
module.exports = mongoose.model('Transaccion', transactionSchema);
