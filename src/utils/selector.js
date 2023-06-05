
const controlSettings = require("../utils/settings.js");
const controlContacts = require('../utils/contacts.js');
const controlRecords = require('../utils/records.js');
const controlVolumen = require('../utils/volumen.js');
const controlTabs = require('../utils/tabs.js');
const controlTransacciones = require('../utils/transactions.js');
const controlMusic = require('../utils/music.js');
const chatbot = require("../api/chatbot.js");

async function selectOrder(data, user_id) {

    var intent = data.intents[0].name
    var entities = data.entities;
    var orden = data.text;

    console.log(data)
    var respuesta;
    switch (intent) {
        case "settings":
            console.log('entra en el ajuste de settings')
            respuesta = await controlSettings(entities, orden, user_id)
            break;
        case "contactos":
            console.log('entra en el ajuste de contactos')
            respuesta = await controlContacts(entities, user_id)
            break;
        case "records":
            console.log('entra en recordatorios')
            respuesta = await controlRecords(entities, user_id)
            break;
        case "transaction":
            console.log('entra en transacciones')
            respuesta = await controlTransacciones(entities, user_id)
            break;
        case 'music':
            console.log('entra en musica')
            respuesta = await controlMusic(entities, orden);
            break;
        case 'tabs':
            console.log('entra en tabs');
            respuesta = await controlTabs(entities, orden);
            break;
        case 'volumen':
            respuesta = await controlVolumen(entities, orden);
            break;
        case 'chat':
            respuesta = await chatbot(orden)
            break;
        default:
            respuesta = await chatbot(orden)
            break;
    }
    return await respuesta;
}

module.exports = selectOrder;