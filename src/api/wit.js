require('dotenv').config();
const { Wit, log } = require('node-wit');
// Setea el token de acceso del bot de Wit.ai
const client = new Wit({ accessToken: process.env.ACCES_TOKEN_WIT });

function witQuery(message) {
  try{
    return client.message(message, {})
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  }catch(err){
    return "No entiendo lo que has dicho, podrias repetir?"
  }

}
module.exports = witQuery;