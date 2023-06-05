const aux = require("../utils/auxiliarFunctions");
const loudness = require("loudness");
function controlVolumen(entities, traits , res) {
    console.log('No entra en volumen para nada')
    try{
        var respuesta 
        var action = entities['action:action'][0].value;
        var cuantityType = entities['cuantity:cuantity'][0].entities['especific_cuantity:especific_cuantity'][0].value;
        var cuantityStr = entities['cuantity:cuantity'][0].value
        var cuantity = aux.extractNumber(cuantityStr)
    
        if (cuantityType == 'absolut') {
            loudness.setVolume(cuantity);
            respuesta = "Volumen ajustado correctamente"
        } else if (cuantityType == "relative") {
            if (action == "up") {
                loudness.getVolume().then((vol) => {
                    volAdjustNum = vol + (vol * cuantity)/100;
                    loudness.setVolume(volAdjustNum);
                    respuesta = "Volumen ajustado correctamente"
                })
            } else if (action == "down") {
                loudness.getVolume().then((vol) => {
                    volAdjustNum = vol - (vol * cuantity)/100;
                    loudness.setVolume(volAdjustNum);
                    respuesta = "Volumen ajustado correctamente"
                })
            }
        }
    }catch(err){
        respuesta = "No entiendo tu orden sobre el volumen"
    }


    return respuesta

}


module.exports = controlVolumen;