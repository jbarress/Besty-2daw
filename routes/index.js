const express = require('express');
const witQuery = require("../src/api/wit.js");
const chatbot = require("../src/api/chatbot.js");
const selectOrder = require("../src/utils/selector.js");
const Contacto = require("../models/contact.js");
const Transaccion = require('../models/transaccion.js');
const conf = require('../public/js/configuracion.js');
const router = express();


router.get('/getConf', async (req, res)=>{
  const valores = conf.valores;
  res.json(valores);
})



router.get('/', isAuthenticated, async (req, res) => {
  user_id = req.user._id.toString();
  var contactos = await Contacto.find({ user_id: user_id });
  var transacciones = await Transaccion.find({ user_id: user_id });
  res.render('index', {contactos, transacciones});
})

router.post('/', isAuthenticated,  async (req, res) => {
  var orden = req.body.orden;
  user_id = req.user._id.toString();
  if(orden!=undefined){
    try{
      var dataWit = await witQuery(req.body.orden)
      console.log(dataWit.intents[0].name)
      if(dataWit.intents[0].name == "logout"){
        res.redirect("/auth/logout");
      }else{
        var contactos = await Contacto.find({ user_id: user_id });
        var transacciones = await Transaccion.find({ user_id: user_id });
        var dataSelector = await selectOrder(dataWit, user_id);
        res.render('index', {respuestaBot: dataSelector, contactos, transacciones});
      }

    }catch(err){
      var contactos = await Contacto.find({ user_id: user_id });
      var transacciones = await Transaccion.find({ user_id: user_id });
      var respuestaBot = await chatbot(orden);
      res.render('index', {respuestaBot: respuestaBot, contactos, transacciones});
    }
  }else{
    var dataChat = await chatbot(req.body.orden)
    res.render('index', {respuestaBot: dataChat ,contactos, transacciones});
  }
});

// Middleware para proteger rutas
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }

  res.redirect('/auth/login');
}


module.exports = router