const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

module.exports = passport => {
    passport.use('faculty',
        new JwtStrategy(opts, (jwt_payload, done) => {
            db.Faculty.findOne({
                where: {
                    email: jwt_payload.email
                }
            })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    passport.use('student',
        new JwtStrategy(opts, (jwt_payload, done) => {
            db.Student.findOne({
                where: {
                    email: jwt_payload.email
                }
            })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    passport.use('parent',
        new JwtStrategy(opts, (jwt_payload, done) => {
            db.Parent.findOne({
                where: {
                    email: jwt_payload.email
                }
            })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};