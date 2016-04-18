// Get the User
var User = require('../models/user');
var errorDuplicates = {
    // This is a bad request error
    status: 400,
    errorMsg: {
        message: "Cannot create a username that already exists"
    }
}

// Add a GET endpoint at /api/users
exports.getUsers = function(req, res) {
    // Return the usernames
    User.find({}, {username: 1}, function(err, users) {
        if (err) {
            res.send();
        }
        else
            res.json(users);
    });
};

// Add a POST endpoint at /api/users
exports.postUser = function(req, res) {
    // Create a new User object
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if (err) {
            res.status(errorDuplicates.status)
            res.send(errorDuplicates.errorMsg);
        }
        else
            res.json({
                message: 'New user successfully added!',
                user: {
                    username: user.username
                }
            });
    });
};

// Add a DELETE endpoint at /api/users/:username
exports.deleteUser = function(req, res) {
    User.findOneAndRemove({}, { username: req.params.username }, function(err, user) {
        if (err)
            res.send(err);
        else
            res.json({ message: "User deleted!"});
    })
}

// Add a GET endpoint at /api/users/:username
exports.getUser = function(req, res) {
    User.findOne({}, { username: req.params.username }, function(err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    })
}
