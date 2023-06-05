
const mongoose = require('mongoose');
let TareaSchema = new mongoose.Schema({

    nombre: {
        type: String
    },
    descripcion: {
        type: String,
        required: true
    },
    prioridad: {
        type: Number,
        required: true
    },


})

let Tarea = mongoose.model('tarea', TareaSchema);

module.exports = Tarea; 