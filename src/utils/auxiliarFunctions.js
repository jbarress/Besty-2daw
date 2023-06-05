
const moment = require('moment');

function extractNumber(input) {
  var matches = input.match(/\d+/);
  if (matches === null) {
    return null;
  }
  return parseInt(matches[0], 10);
}
function convertToNumber(str) {
  if (!str) {
    return null;
  }

  if (typeof str === "number") {
    return str;
  }

  if (typeof str === "string") {
    const trimmed = str.trim();
    const lastChar = trimmed.charAt(trimmed.length - 1);

    if (lastChar === "%") {
      return parseFloat(trimmed) / 100;
    }

    const words = {
      maximo: 1,
      minimo: 0,
      poco: 0.25,
      algo: 0.5,
      bastante: 0.75,
      mucho: 1,
    };
    const wordValue = words[trimmed.toLowerCase()];
    if (wordValue !== undefined) {
      return wordValue;
    }

    const parsed = parseFloat(trimmed);
    if (!isNaN(parsed)) {
      return parsed / 100; 
    }
  }

  return null;
}

//FORMATEO DE FECHAS A FORMATO DATE

function parseDateOfWeek(dayOfWeekStr) {
  var daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var targetDay = daysOfWeek.indexOf(dayOfWeekStr.toLowerCase());
  if (targetDay === -1) {
    throw new Error('Día de la semana no válido');
  }
  var today = new Date();
  var daysUntilTargetDay = (targetDay - today.getDay() + 7) % 7;
  if (daysUntilTargetDay === 0) {
    daysUntilTargetDay = 7;
  }
  var nextDate = new Date(today.getTime() + (daysUntilTargetDay * 24 * 60 * 60 * 1000));
  return nextDate;
}


function parseDateSpecific(input) {
  var dateParts = input.split(' de ');
  var day = parseInt(dateParts[0], 10);
  var monthStr = dateParts[1];
  var year = new Date().getFullYear();

  var monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var month = monthNames.indexOf(monthStr.toLowerCase());

  if (month === -1) {
    throw new Error('Mes no válido');
  }

  var date = new Date(year, month, day);
  return date;
}


function parseDateRelative(input) {
  var inputStr = input.toLowerCase().trim();
  var date;

  switch (inputStr) {
    case 'hoy':
      date = moment().toDate();
      break;
    case 'mañana':
      date = moment().add(1, 'days').toDate();
      break;
    case 'pasado mañana':
      date = moment().add(2, 'days').toDate();
      break;
    default:
      return false;
  }
  return date;
}
//FORMATEO DE HORAS A FORMATO CORRECTO PARA DATE
function parseTime(hour, meridian) {
  var date = new Date();
  var hourInt = parseInt(hour);
  if (hourInt >= 1 && hourInt <= 12) {
    if (meridian.toLowerCase() === 'pm') {
      hourInt += 12;
    }
    date.setHours(hourInt, 0, 0, 0);
    return date.toLocaleTimeString('en-US', { hour12: false });
  } else {
    throw new Error('Hora no válida');
  }
}

//COMBINA LAS 3 FUNCIONES ANTERIORES

function main(input) {
  var date;

  // Primero, intenta parsear la fecha como día de la semana
  try {
    date = parseDateOfWeek(input);
  } catch (error) {
    // Si no se puede parsear como día de la semana, intenta parsear como fecha específica
    try {
      date = parseDateSpecific(input);
    } catch (error) {
      // Si no se puede parsear como fecha específica, intenta parsear como fecha relativa
      date = parseDateRelative(input);
      if (!date) {
        throw new Error('Formato de fecha no válido');
      }
    }
  }

  return date;
}

//COMBINA FECHA Y HORA DESPUES DE SER FORMATEADAS

function combineDateTime(date, time) {
  var dateParts = date.toISOString().split('T');
  var timeParts = time.split(':');

  if (dateParts.length !== 2 || timeParts.length !== 3) {
    throw new Error('Formato de fecha u hora no válido');
  }

  var newDate = new Date(dateParts[0] + 'T' + time + 'Z');
  return newDate;
}

//COMBINACION DE TODAS LAS FUNCIONES QUE REFERENCIA AL FORMATEO DE HORAS 
function combineDateAndTime(dateStr, hour, meridian) {
  var date = main(dateStr);
  var time = parseTime(hour, meridian);
  var combinedDate = combineDateTime(date, time);
  return combinedDate;
}

console.log(combineDateAndTime('5 de abril', '2', 'am'))

module.exports = {convertToNumber, combineDateAndTime, extractNumber};