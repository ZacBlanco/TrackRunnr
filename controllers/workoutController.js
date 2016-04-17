// Get the User
var Workout = require('../models/workoutEntry');

var postErrMsg = {
	message: "There was an error submitting your data"
};
var getErrMsg = {
	message: "There was an error retrieving your data"
};

//Get all the workouts (user, callback)
exports.getWorkouts = function(user, callback) {
	Workout.find({username: user}, function(err, workouts) {
        if (err) {
            callback(err, workouts);
        } else {
            callback(err, workouts);
		}
    });
};


//Put a new workout for a user
exports.postWorkout = function(user, data, callback) {

	var workout = new Workout();
	workout.username = user;
	workout.date = data.date;
	workout.difficulty = data.difficulty;
	workout.totalTime = data.totalTime;
	workout.distance = data.distance;

	workout.save(function(err, entry) {
		callback(err, entry);
	});
};

exports.deleteWorkouts = function(user, callback) {
	Workout.remove({ username: user}, function(err) {
		if(err) {
			callback(err);
		} else {
			callback(false);
		}
	});
};

exports.deleteWorkout = function(id, callback) {

	Workout.remove({ _id: id}, function(err) {
		if(err) {
			callback(err);
		} else {
			callback(false);
		}
	});
};



exports.getWorkout = function(id, callback) {
	Workout.findById(id, function(err, workout) {
		callback(err, workout);
	});
};


exports.updateWorkout = function(id, data, callback) {
	Workout.findById(id, function(err, workout) {
		if (err) {
            callback(err, workout);
        } else {

			workout.date = data.date;
			workout.difficulty = data.difficulty;
			workout.totalTime = data.totalTime;
			workout.distance = data.distance;

			workout.save(function(err, entry){
				callback(err, entry);
			});
		}
    });
};
