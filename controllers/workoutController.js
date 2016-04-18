// Get the User
var Workout = require('../models/workoutEntry');

//Get all the workouts (user, callback)
exports.getAllWorkouts = function(user, callback) {
	
	Workout.find({username: user}, function(err, workouts) {
        if (err) {
            callback(err, workouts);
        } else {
            callback(err, workouts);
		}
    });
};


//Put a new workout for a user
exports.createWorkout = function(user, data, callback) {
	
	
	
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

//Delete all workouts under a specified user (user, callback)
exports.deleteAllUserWorkouts = function(user, callback) {
	Workout.remove({ username: user}, function(err) {
		if(err) {
			callback(err);
		} else {
			callback(false);
		}
	});
};

// Delete a single workout given an ID - (id, callback)
exports.deleteWorkoutById = function(id, callback) {
	Workout.remove({ _id: id}, function(err) {
		if(err) {
			callback(err);
		} else {
			callback(false);
		}
	});
};



exports.getWorkoutById = function(id, callback) {
	Workout.findById(id, function(err, workout) {
		callback(err, workout);
	});
};


//Update workout - (workoutID, data, callback)
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
