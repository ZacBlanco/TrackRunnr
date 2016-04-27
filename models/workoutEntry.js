var mongoose = require('mongoose');

//Schema which defines data for a workout
var WorkoutSchema = new mongoose.Schema({
	username: {type: String, required: true },
	date: { type: Date, required: true},
	difficulty: {type: Number, min:1, max:10},
	totalTime: {type: Number, required: true},
	distance: {type: Number, required: true}
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
