const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var models = require('../models');
var Admin = models.Admin
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport2 => {
    passport2.use('admin',
        new JwtStrategy(opts, (jwt_payload, done) => {
            Admin.findOne({
                where: {
                    id: jwt_payload.id
                }
            })
                .then(admin => {
                    if (admin) {
                        return done(null, admin)
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err));
        })
    );
};