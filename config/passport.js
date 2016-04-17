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
        function(req, username, password, done) {
            console.log(username);
            console.log(password);
            process.nextTick(function() {

            // Find account with the passed in username
            User.findOne({ 'username':  username }, function(err, user) {
                if (err)
                    return done(err);

                // Check for existing username
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // Create new account
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    // Save user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        console.log(newUser);
                        console.log(done);
                        return done(null, newUser);
                    });
                }

            });

            });

    }));


    passport.use('local-login', new LocalStrategy(
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
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            // all is well, return successful user
            return done(null, user, {});
        });

    }));


};
