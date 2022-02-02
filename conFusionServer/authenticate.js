const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/user'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    jwt = require('jsonwebtoken'), // used to create sign and verify tokens
    config = require('./config');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
};

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);

        User.findOne({_id: jwt_payload._id}, (err, user) => {
            console.log('***********************************');
            console.log('***********************************');
            console.log('***********************************');
            console.log('***********************************');
            console.log('user', user);
            console.log('***********************************');
            console.log('***********************************');
            console.log('***********************************');
            console.log('***********************************');

            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    })
);

exports.verifyAdmin = (req, res, next) => {
    console.log('verifyAdmin');
    console.log('req', req);
    console.log('res', res);
    console.log('next', next);
    console.log('req.user', req.user);

    if (req.user && req.user.admin) {
        return next();
    }

    let err = new Error('You are not authorized to perform this operation!');
    err.status = 403;

    return next(err);
};

exports.verifyUser = passport.authenticate('jwt', {session: false});