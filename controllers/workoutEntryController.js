// Get the User
var Workout = require('../models/workoutEntry');

var postErrMsg = {
	message: "There was an error submitting your data"
};
var getErrMsg = {
	message: "There was an error retrieving your data"
};


// A GET endpoint at /api/users/:username/workout
exports.getWorkouts = function(req, res) {
	Workout.find({username: req.params.username}, function(err, workouts) {
        if (err) {
            res.send(getErrMsg.message);
        }
        else
            res.json(workouts);
    });
}

// A POST endpoint at /api/users/:username/workout
exports.postWorkout = function(req, res) {
	
	var data = req.body;
	var workout = new Workout();
	workout.username = req.params.username;
	workout.date = data.date;
	workout.difficulty = data.difficulty;
	workout.totalTime = data.totalTime;
	workout.distance = data.distance;
	
	if(typeof(req.params.username) == 'undefined') {
		res.status(400);
		res.json({message: "username required to post data"});
		return;
	} else if(typeof(data.date) == 'undefined' ) {
		res.status(400);
		res.json({message: "date required to post data"});
		return;
	} else if(typeof(data.totalTime) == 'undefined') {
		res.status(400);
		res.json({message: "total time required to post data"});
		return;
	} else if(typeof(data.distance) == 'undefined') {
		res.status(400);
		res.json({message: "distance required to post data"});
		return;
	} 
	
	
	workout.save(function(err, entry) {
		if(err) {
			res.status = 400;
			res.send(errMsg);
		} else {
			
			resJson = {
				message: "Workout Saved Successfully!",
				id: entry._id,
				username: entry.username
			}
			
			res.json(resJson);
		}
	});
}

exports.deleteWorkouts = function(req, res) {
	
	Workout.remove({ username: req.params.username}, function(err) {
		if(err) {
			res.status = 400;
			res.send(err);
		} else {
			res.send({message: "All workouts under " + req.params.username +" deleted"});
		}
	});
	
	
}
