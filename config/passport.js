import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
const User = mongoose.model('users');
const { secretKey } = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.data.id)
        .then(user => {
            // check if the user has been found
            if (user) {
                
                return done(null, user);
            } 
            // this can be customized to return any unsuccessfull error message like login required
            // by default this returns unauthorized
            return done(null, false);
        })
        .catch(err => console.log(err));
    }));
}
