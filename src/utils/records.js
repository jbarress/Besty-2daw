
const Record = require('../../models/record');
const chatbot = require("../api/chatbot.js");
const conf = require('../../public/js/configuracion');
const aux = require("../utils/auxiliarFunctions");

async function controlRecords(entities, user_id) {

    var action = entities['action:action']?.[0]?.value;

    var respuesta;

    switch (action) {
        case 'show':
            try{
                conf.showCalendar = true;
            }catch(err){
                respuesta = chatbot()
            }
            break;
        case 'hide':
            try{
                conf.showCalendar = false;
            }catch(err){
                respuesta = "No puedo esconder los recordatorios"
            }
            break;
        case 'create':

            try {
                var date = entities['date:date']?.[0]?.value;
                var timeEnt = entities['time:time']?.[0]?.value;
                var time = aux.extractNumber(timeEnt).toString();
                var meridian = entities['time:time']?.[0]?.entities['especific_time:especific_time'][0].value;
                var nombre = entities['tittle:tittle']?.[0]?.value;

                var start = aux.combineDateAndTime(date, time, meridian);
                var end = new Date(start.getTime() + (60 * 60 * 1000));

                const data = {
                    user_id: user_id,
                    title: nombre,
                    start: start,
                    end: end
                };
                const nuevoRecord = new Record(data);
                await nuevoRecord.save();
                respuesta = 'He guardado la recordatorio correctamente'
            } catch (err) {
                respuesta = 'No he podido guardar el recordatorio'
            }

            break;

        case 'del':
            try {
                var nombre = entities['tittle:tittle']?.[0]?.value;
                const record = await Record.findOne({ title: nombre });
                if (!record) {
                    respuesta = `El recordatorio con ${nombre} no existe`;
                } else {
                    Record.findByIdAndDelete(record._id);
                    respuesta = 'He eliminado el recordatorio';
                }
            } catch (error) {
                respuesta = 'No he podido eliminar el recordatorio';
            }
            break;
        default:
            respuesta = 'No he podido ejecutar el comando';

    }
    return await respuesta;
}


module.exports = controlRecords;