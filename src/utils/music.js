
const getTrackId = require("../api/spotify.js");
const conf = require('../../public/js/configuracion')
const chatbot = require("../api/chatbot.js");
async function controlMusic(entities) {

    var action = entities['action:action']?.[0]?.value;
    var id;
    switch (action) {
        case "active":
            var tittle = entities['tittle:tittle']?.[0]?.value;
            var artist = entities['artist:artist']?.[0]?.value;
            var respuesta
            if (!tittle) {
                respuesta = chatbot('`Imagina que eres un asistente virtual. Escribe la respuesta que darias para avisar de que se debe especificar un artista')
            } else if (!artist) {
                respuesta = chatbot('`Imagina que eres un asistente virtual. Escribe la respuesta que darias para avisar de que se debe especificar una cancion en concreto')
            } else {
                respuesta = "Reproduciendo la cancion " + tittle + " de " + artist;
                id = await getTrackId(tittle, artist);
                if (id) {
                    conf.idMusic = id;
                }
            }
            break;
        case "stop":
            conf.idMusic = "";
            respuesta = chatbot('`Imagina que eres un asistente virtual. Escribe la respuesta que darias para avisar de que has parado la musica`')
            break;
        default:
            respuesta = chatbot('`Imagina que eres un asistente virtual. Escribe la respuesta que darias para avisar de un error al no detectar un comando claro sobre la funcion musica`')
    }
    return await respuesta;
}

module.exports = controlMusic;