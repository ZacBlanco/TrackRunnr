// Get the User
var User = require('../../models/user');
var userFunctions = require('../userController');

// Add a GET endpoint at /api/users
exports.getUsers = function(req, res) {
    // Return the usernames
    userFunctions.getAllUsers(function(err, data){
		if(err) {
			res.status(400);
			res.json(err);
		} else {
			res.status(200);
			res.json(data);
		}
	});
};

// Add a POST endpoint at /api/users
exports.postUser = function(req, res) {
    // Create a new User object
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    userFunctions.createUser(user, function(err, data){
		if(err){
			res.status(400);
			if(err.code == 11000) {
				return res.json({message: "Username already exists"})
			} else {
				res.json(err);
			}
		} else {
			res.status(200);
			res.json(data);
		}
	});
};

// Add a DELETE endpoint at /api/users/:username
exports.deleteUser = function(req, res) {
    userFunctions.deleteUser(req.params.username, function(err, data){
		if(err){
			res.status(400);
			res.json(err);
		} else {
			res.status(200);
			res.json(data);
		}
	});
}

// Add a GET endpoint at /api/users/:username
exports.getUser = function(req, res) {
    userFunctions.getUser(req.params.username, function(err, data){
		if(err){
			res.status(400);
			res.json(err);
		} else {
			res.status(200);
			res.json(data);
		}
	});
}
