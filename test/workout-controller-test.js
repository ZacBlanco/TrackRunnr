var server = require('../server');
var workoutFunctions = require('../controllers/workoutController')
var chai = require('chai');
var should = require('should');
var assert = chai.assert;

function createRandWorkout(user_name){
	var rand = Math.random();
	var data = {
			username: user_name,
			date: Date.now(),
			difficulty: Math.ceil(rand*10),
			totalTime: Math.ceil(rand*100000),
			distance: Math.ceil(rand*20)
	};
	return data;
}


describe('Test suite for the Workout controller', function(done) {
	it('Creates a workout and add it to the database', function(done) {
		var username = "Bob"
		var workoutData = createRandWorkout("Bob");
		workoutFunctions.createWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
			assert.equal(entry.username, username, 'Equal usernames')
			assert.equal(new Date(entry.date).getTime(), new Date(workoutData.date).getTime());
			assert.equal(entry.difficulty, workoutData.difficulty);
			assert.equal(entry.distance, workoutData.distance);
			assert.equal(entry.totalTime, workoutData.totalTime);
			done();
		});
	});
	it('Creates and get a workout for a user', function(done) {
		var username = "Bob";
		var workoutID;
		var workoutData = createRandWorkout("Bob");
		workoutFunctions.createWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
			assert.equal(entry.username, username, 'Equal usernames')
			assert.equal(new Date(entry.date).getTime(), new Date(workoutData.date).getTime());
			assert.equal(entry.difficulty, workoutData.difficulty);
			assert.equal(entry.distance, workoutData.distance);
			assert.equal(entry.totalTime, workoutData.totalTime);
			workoutID = entry.id;
			// This must run after the first one has posted the workout
			workoutFunctions.getWorkoutById(workoutID, function(err, workout){
				assert(err === null);
				assert.equal(workout.username, username, 'Equal usernames')
				assert.equal(new Date(workout.date).getTime(), new Date(workoutData.date).getTime());
				assert.equal(workout.difficulty, workoutData.difficulty);
				assert.equal(workout.distance, workoutData.distance);
				assert.equal(workout.totalTime, workoutData.totalTime);
				done();
			});
		});
		
	});
	it('Retrieves a nonexistent workout ID', function(done){
		var username = "Bob"
		var workoutData = createRandWorkout("Bob");
		workoutFunctions.getWorkoutById("badWorkoutID123", function(err, data){
			assert(err !== null);
			done();
		});
	});
	it('Retrieves workouts from a nonexistent user', function(done){
		var username = "Nick"
		workoutFunctions.getAllWorkouts(username, function(err, data){
			assert.equal(err, null);
			assert.equal(data.length, 0, 'No data should be returned');
			done();
		});
	});
	it('Creates multiple and retrieves multiple workouts', function(done){
		var username = "Joey";
		var workoutData = createRandWorkout(username);
		//Reset user workouts
		workoutFunctions.deleteAllUserWorkouts(username,  function(){});
		workoutFunctions.createWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
		});
		var workoutData = createRandWorkout(username);
		workoutFunctions.createWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
		});
		var workoutData = createRandWorkout(username);
		workoutFunctions.createWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
		});
		var workoutData = createRandWorkout(username);
		workoutFunctions.createWorkout(username, workoutData, function(err, entry) {
			assert(err === null);
		});
		workoutFunctions.getAllWorkouts(username, function(err, data){
			assert.equal(data.length, 4);
			for(i = 0; i < data.length; i++) {
				assert.equal(username, data[i].username);
			}
			done();
		});
	});
	it('Delete all workouts for a user', function(done){
		var username = "Bob";
		createWorkout = function(num, username) {
			workoutFunctions.createWorkout(username, createRandWorkout(username), function() {
				if(num >= 0)
					createWorkout(num-1, username);
			});
		}
		
		
//		for(i = 0; i < 5; i++){
//			workoutFunctions.createWorkout(username, createRandWorkout(username), function(){});
//		}
		workoutFunctions.deleteAllUserWorkouts(username, function(err){
			assert.equal(err, null, 'make sure err is not present');
			workoutFunctions.getAllWorkouts(username, function(err, data){
				assert.equal(err, null, 'make sure err is not present');
				assert.equal(data.length, 0, 'no workouts should be present');
				done();
			});
		});
	});
});
































