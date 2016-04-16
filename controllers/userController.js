// Get the User
var User = require('../models/user');

// Add a GET endpoint at /api/users
exports.getUsers = function(req, res) {
    // Return the json for all of the users
    User.find({}, {username: 1, _id: 1}, function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

// Add a POST endpoint at /api/users
exports.postUsers = function(req, res) {
    // create a new Users object
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if (err) {
            res.send(err);
        }
        else
            res.json({ message: 'New user successfully added!' });
    });
};
