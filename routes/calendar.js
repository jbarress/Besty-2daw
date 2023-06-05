const express = require('express');
const Record = require('../models/record.js');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/getEventos', async (req, res) => {
    const user_id = req.user._id.toString();
    const records = await Record.find({user_id: user_id});
    res.json(records);
});


module.exports = app;