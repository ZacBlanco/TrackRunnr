var server = require('../server');
var workoutFunctions = require('../controllers/workoutController')
var chai = require('chai');
var should = require('should');
var assert = chai.assert;

function createRandWorkout(user_name){
	var data = {
			username: user_name,
			date: Date.now(),
			difficulty: Math.ceil(Math.random()*10),
			totalTime: Math.ceil(Math.random()*100000),
			distance: Math.ceil(Math.random()*20)
	};
	return data;
}


describe('Test suite to test the basic workout functions', function(done) {
	it('Create a workout and add it to the database', function(done) {
		var username = "Bob"
		var workoutData = createRandWorkout("Bob");
		workoutFunctions.postWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
			assert.equal(entry.username, username, 'Equal usernames')
			assert.equal(new Date(entry.date).getTime(), new Date(workoutData.date).getTime());
			assert.equal(entry.difficulty, workoutData.difficulty);
			assert.equal(entry.distance, workoutData.distance);
			assert.equal(entry.totalTime, workoutData.totalTime);
			done();
		});
	});
	it('Create and get a workout', function(done) {
		var username = "Bob"
	   var workoutID;
		var workoutData = createRandWorkout("Bob");
		workoutFunctions.postWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
			assert.equal(entry.username, username, 'Equal usernames')
			assert.equal(new Date(entry.date).getTime(), new Date(workoutData.date).getTime());
			assert.equal(entry.difficulty, workoutData.difficulty);
			assert.equal(entry.distance, workoutData.distance);
			assert.equal(entry.totalTime, workoutData.totalTime);
			done();
		});
		workoutFunctions.getWorkout(workoutID, function(err, workout){
			assert(err === null);
			assert.equal(workout.username, username, 'Equal usernames')
			assert.equal(new Date(workout.date).getTime(), new Date(workoutData.date).getTime());
			assert.equal(workout.difficulty, workoutData.difficulty);
			assert.equal(workout.distance, workoutData.distance);
			assert.equal(workout.totalTime, workoutData.totalTime);
		});
	});
});