// Get the User
var User = require('../models/user');


// Add a GET endpoint at /api/users
module.exports.getAllUsers = function(callback) {
    // Return usernames
    User.find({}, {username: 1}, function(err, users) {
		callback(err, users);
    });
};

// Add a new user to the database. Callback passes (err) and the new user object
module.exports.createUser = function(userObject, callback) {
    // Create a new User object
    var user = new User();
	user.username = userObject.username;
	user.password = userObject.password;

    user.save(function(err) {
        
		if(!err) {
            var resJson = {
                message: 'New user successfully added!',
                user: {
                    username: user.username
                }
			};
			callback(err, resJson);
		} else {
			callback(err, null);
		}
    });
};


// Delete a user with a given username.
module.exports.deleteUser = function(username, callback) {
	
	if(username == null) {
		return callback({message: "Username cannot be null or undefined"}, null)
	}
	
    User.findOneAndRemove({ username: username }, function(err, user) {
		if(err == null && user == null) {
			return callback(null, {message: 'Username not found. User was not deleted'})
		}
        if (err) {
            callback(err, response);
		} else {
            callback(null, { message: "User: " + user.username + " deleted!"});
    }});
}

// Add a GET endpoint at /api/users/:username
module.exports.getUser = function(username, callback) {
	if(username == null) {
		return callback({message: "Username cannot be null or undefined"}, null);
	}
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            callback(err, null);
		} else {
			if(user == null) { //will be true for null OR undefined with ==
				callback(null, {message: "User: " + username + " not found!"})
			} else {
				callback(null, user);
			}
            
		}
    });
}
