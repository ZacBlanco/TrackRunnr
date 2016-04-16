// Load packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

// Give passport the BasicStrategy from passport-http
passport.use(new BasicStrategy(
    // Authenticates a given username/password
    function(username, password, callback) {
        // Check if someone with that username exists, if so, check the password
        User.findOne({ username: username}, function(err, user) {
            if (err)
                return callback(err);
            if (!user)
                return callback(null, false);
            user.verifyPassword(password, function(err, isMatch) {
                if (err)
                    return callback(err);
                if (!isMatch)
                    return callback(null, false);
                return callback(null, user);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
