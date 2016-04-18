var workoutController = require('./workoutController');


exports.submitWorkout = function(req, res) {
	var workout = {
            username: req.body.username,
            date: req.body.date,
            difficulty: req.body.difficulty,
            totalTime: req.body.hours * 3600 + req.body.minutes * 60 + req.body.seconds,
            distance: req.body.distance
        };
	workoutController.postWorkout(workout.username, workout, function(err, entry){
		res.redirect('/profile')
	});
};