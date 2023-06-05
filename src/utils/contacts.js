
const Contacto = require('../../models/contact');
const conf = require('../../public/js/configuracion')
const chatbot = require("../api/chatbot.js");

async function controlContacts(entities, user_id) {

  var action = entities['action:action']?.[0]?.value;
  var respuesta
  switch (action) {

    case 'show':
      conf.showContacts = true;
      respuesta = chatbot('Imagina que eres un asistente virtual. Escribe la respuesta que darias para confirmar que has mostrado los contactos')
      break;

    case 'hide':
      conf.showContacts = false;
      respuesta = chatbot('Imagina que eres un asistente virtual. Escribe la respuesta que darias para confirmar que has escondido los contactos')
      break;

    case 'create':
      try {
        var nombre = entities['wit$contact:contact']?.[0]?.value;
        var numTel = entities['wit$phone_number:phone_number']?.[0]?.value;
        var email = entities['wit$email:email']?.[0]?.value;
        const data = {
          user_id: user_id,
          nombre: nombre,
          telefono: numTel,
          email: email
        };
        const newContact = new Contacto(data);
        newContact.save();
        respuesta = chatbot('Imagina que eres un asistente virtual. Escribe la respuesta que darias para confirmar que has creado un nuevo contacto')
      } catch (err) {
        respuesta = chatbot('Imagina que eres un asistente virtual. Escribe la respuesta que darias para avisar de un error al crear un contacto')
      }
      break;

    case 'del':
      var nombre = entities['wit$contact:contact']?.[0]?.value;
      if (!nombre) {
        respuesta = 'Por favor, especifique el nombre del contacto que desea eliminar.';
      } else {
        const contactoBuscado = await Contacto.findOne({ nombre: nombre });
        if (!contactoBuscado) {
          respuesta = chatbot(`Imagina que eres un asistente virtual. Escribe la respuesta que darias para avisar de un error al no encontrar un contacto con nombre ${nombre}`)
        } else {
          await Contacto.findByIdAndDelete(contactoBuscado._id);
          respuesta = chatbot(`Imagina que eres un asistente virtual. Escribe la respuesta que darias para confirmar que has borrado un contacto con nombre ${nombre}`)
        }
      }
      break;

    case 'edit':

      var nombre = entities['wit$contact:contact']?.[0]?.value;
      var numTel = entities['wit$phone_number:phone_number']?.[0]?.value;
      var email = entities['wit$email:email']?.[0]?.value;

      if (!nombre) {
        respuesta = 'Por favor, especifique el nombre del contacto que desea modificar.';
      } else {
        const contactoBuscado = await Contacto.findOne({ nombre: nombre });

        if (!contactoBuscado) {
          respuesta = `El contacto con nombre ${nombre} no existe`;
        } else {
          var contactoModificado = await Contacto.findById(contactoBuscado._id);

          if (numTel) {
            contactoModificado.telefono = numTel;
          }

          if (email) {
            contactoModificado.email = email;
          }

          await contactoModificado.save();

          respuesta = `El contacto ${nombre} ha sido modificado.`;
        }
      }
      break;
    default:
      respuesta = chatbot(`Imagina que eres un asistente virtual. Escribe la respuesta que darias para avisar de un error al no detectar un comando claro sobre los contactos`)

  }
  return await respuesta;
}



module.exports = controlContacts;