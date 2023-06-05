
const loudness = require("loudness");
const convertToNumber = require("../utils/auxiliarFunctions");

async function controlSettings(entities, orden) {
    console.log('entra en settings')
    var object = entities['object:object'][0].value;
    console.log(object)
    switch (object) {
        case "vol":
            var respuestaVolumen = await adjustVolumen(entities)
            return respuestaVolumen;
        //Coming soon...
    }
}

function adjustVolumen(entities) {
    try{
        var action = entities['action:action'][0].value;
        var cuantityStr = entities['cuantity:cuantity'][0].body;
        var cuantityMod = entities['settings_cuantity_type:settings_cuantity_type'][0].value;
    
        var cauntityNum = convertToNumber(cuantityStr);
        console.log(cauntityNum)
        if (cuantityMod == 'absolut') {
            loudness.setVolume(cauntityNum * 100);
        } else if (cuantityMod == "relative") {
            if (action == "up") {
                loudness.getVolume().then((vol) => {
                    volAdjustNum = vol + vol * cauntityNum;
                    loudness.setVolume(volAdjustNum);
                })
            } else if (action == "down") {
                loudness.getVolume().then((vol) => {
                    volAdjustNum = vol - vol * cauntityNum;
                    loudness.setVolume(volAdjustNum);
                })
            }
        }
        return "volumen ajustado correctamente"
    }catch(err){
        return "No he podido ajustar el volumen"
    }
}

module.exports = controlSettings;