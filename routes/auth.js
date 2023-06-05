const express = require('express');
const passport = require('../src/autenticacion/autenticacion');
const bcrypt = require('bcrypt');
const User = require('../models/usuario');
const app = express();

app.get('/', (req, res) => {
    res.render('viewer', { user: req.user });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        res.redirect('/');
    });
});


app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    User.findOne({ username: username })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send('El usuario ya existe');
            }

            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    const newUser = new User({
                        id: Number,
                        username: username,
                        password: hashedPassword,
                        email: email
                    });

                    newUser.save()
                        .then(() => res.redirect('/auth/login'))
                        .catch(err => res.status(500).send('Error en el servidor'));
                })
                .catch(err => res.status(500).send('Error en el servidor'));
        })
        .catch(err => res.status(500).send('Error en el servidor'));
});

// Middleware para proteger rutas
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.get('/protected', isAuthenticated, (req, res) => {
    res.send('Ruta protegida');
});

module.exports = app;