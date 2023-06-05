// Importa los módulos necesarios

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../models/usuario');

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Nombre de usuario incorrecto' });
            }

            bcrypt.compare(password, user.password)
                .then(result => {
                    if (!result) {
                        return done(null, false, { message: 'Contraseña incorrecta' });
                    }

                    return done(null, user);
                })
                .catch(err => done(err));
        })
        .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => done(err));
});

module.exports = passport;