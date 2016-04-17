var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy(
        {
            passReqToCallback: true
        }
        , function(req, username, password, done) {
            process.nextTick(function() {

            // Find account with the passed in username
            User.findOne({ 'username':  username }, function(err, user) {
                if (err)
                    return done(err);

                // Check for existing username
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'This username already exists'));
                } else {
                    // Create new account
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    // Save user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });

            });

    }));


    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        // Check if username exists
        User.findOne({ 'username' :  username }, function(err, user) {
            //
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            // if the user is found but the password is wrong
            if (!user.verifyPassword(password))
                return done(null, false, req.flash('loginMessage', 'Incorrect password.'));

            // all is well, return successful user
            return done(null, user);
        });

    }));


};
