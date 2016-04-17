var mongoose = require('mongoose');

//Schema which defines data for a workout
var WorkoutSchema = new mongoose.Schema({
	username: String,
	date: Date,
	difficulty: {type: Number, min:1, max:10},
	totalTime: Number,
	distance: Number
//	cooldown: {
//		time: Number,
//		distance: Number
//	},
//	warmup: {
//		time: Number,
//		distance: Number
//	},
//	pace: Number,
//	type: String,
});



module.exports = mongoose.model('Workout', WorkoutSchema);
