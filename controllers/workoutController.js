// Get the User
var Workout = require('../models/workoutEntry');

//Get all the workouts (user, callback)
exports.getAllWorkouts = function(user, callback) {
	
	if(user === null || user === undefined) {
		callback({message: "Error: User is required"}, null);
		return;
	}
	
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
	
	var errMsg = null;
	errMsg = checkWorkoutInput(user, data);
	
	if(errMsg !== null) {
		callback({message: errMsg}, null);
		return;
	}
	
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
	Workout.remove({ username: user}, function(err, status) {
		if(err) {
			callback(err, {succeeded: false});
		} else {
			callback(null, {succeeded: true});
		}
	});
};

// Delete a single workout given an ID - (id, callback)
exports.deleteWorkoutById = function(id, callback) {
	Workout.remove({ _id: id}, function(err, status) {
		if(err) {
			callback(true, {succeeded: false});
		} else {
			callback(null, {succeeded: true});
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
			
			if(workout == null) {
				callback({message: "No workout found with id: " + id}, null);
				return;
			}
			
			var msg = null;
			msg = checkWorkoutInput(workout.username, data);
			if(msg !== null) {
				callback({message: msg}, null);
				return;
			}
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

function checkWorkoutInput(user, data){
	var errMsg = null;
	if(user == null) {
		errMsg = "User must be defined";
	} else if(data == null) {
		errMsg = "Must have data to update with";
	} else if(user === null || user === undefined) {
		errMsg = "User must be defined";
	} else if(data.date === undefined || data.date === null){
		errMsg = "Date must be defined"
	} else if(data.difficulty === undefined || data.difficulty === null){
		errMsg = "Difficulty must be defined";
	} else if(data.distance === undefined || data.distance === null){
		errMsg = "Distance must be defined";
	} else if(data.totalTime === undefined || data.totalTime === null){
		errMsg = "Total time must be defined";
	}
	return errMsg;
}
