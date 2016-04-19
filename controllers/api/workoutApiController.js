// Get the User
var Workout = require('../../models/workoutEntry');
var workoutFunctions = require('../workoutController')
var postErrMsg = {
	message: "There was an error submitting your data"
};
var getErrMsg = {
	message: "There was an error retrieving your data"
};


// A GET endpoint at /api/users/:username/workout
exports.getWorkouts = function(req, res) {
	workoutFunctions.getAllWorkouts(req.params.username, function(err, results){
		if(err) {
			res.json(err);
		} else if(results.length === 0){
			res.json({message: "No workouts found for user: " + req.params.username});
			return;
		} else {
			res.json(results)
		}
	});
};


// A POST endpoint at /api/users/:username/workout
exports.postWorkout = function(req, res) {
	
	var data = req.body;
	
	workoutFunctions.createWorkout(req.params.username, req.body, function(err, entry){
		if(err) {
			res.status(400);
			res.send(err);
		} else {
			
			resJson = {
				message: "Workout Saved Successfully!",
				id: entry._id,
				username: entry.username
			}
			
			res.json(resJson);
		}
	});
};

exports.deleteWorkouts = function(req, res) {
	workoutFunctions.deleteAllUserWorkouts(req.params.username, function(err){
		if(err) {
			res.status(400);
			res.send(err);
		} else {
			res.send({message: "All workouts under " + req.params.username +" deleted"});
		}
	});
};

exports.deleteWorkout = function(req, res) {
	workoutFunctions.deleteWorkoutById(req.params._id, function(err) {
		if(err) {
			res.status(400);
			res.send(err);
		} else {
			res.send({message: "Workout " + req.params.id + " deleted"});
		}
	});
		
};

exports.getWorkout = function(req, res) {
	workoutFunctions.getWorkoutById(req.params.id, function(err, workout) {
        if (err) {
			res.status(400);
            res.json({message: "No workout exists for id: " + req.params.id })
        } else if(workout !== null) {
			res.json(workout);
		} else {
			res.status(500);
			res.json({message: "No workout exists for id: " + req.params.id })
		}
    });
};


exports.updateWorkout = function(req, res) {
	
	var data = req.body;
	
	workoutFunctions.updateWorkout(req.params.id, data, function(err, workout){
		
		if(err) {
			res.status(400);
			res.send(err);
		} else {
			res.json(workout);
		}
		
	});
};

