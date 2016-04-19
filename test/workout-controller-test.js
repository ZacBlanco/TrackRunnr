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
				if(num >= 0) {
					createWorkout(num-1, username);
				} else {
					workoutFunctions.deleteAllUserWorkouts(username, function(err){
						assert.equal(err, null, 'make sure err is not present');
						workoutFunctions.getAllWorkouts(username, function(err, data){
							assert.equal(err, null, 'make sure err is not present');
							assert.equal(data.length, 0, 'no workouts should be present');
							done();
						});
					});	
				}
					
			});
		}
		createWorkout(10, username);
	});
	it('Null/undefined user - get all workouts', function(done){
		workoutFunctions.getAllWorkouts(null, function(err, data){
			assert.equal(err.message, "Error: User is required");
			assert.equal(data, null);
			workoutFunctions.getAllWorkouts(undefined, function(err, data){
				assert.equal(err.message, "Error: User is required");
				assert.equal(data, null);
				done();
			});
		});
		
	});
	it('Null/undefined values - create workouts', function(done){
		data = createRandWorkout("name");
		workoutFunctions.createWorkout(undefined, data, function(err, res){
			assert.equal(err.message, "User must be defined");
			assert.equal(res, null);
			data.totalTime = undefined;
			workoutFunctions.createWorkout("user", data, function(err, res){
				assert.equal(err.message, "Total time must be defined");
				assert.equal(res, null);
				data.difficulty = null;
				workoutFunctions.createWorkout("user", data, function(err, res){
					assert.equal(err.message, "Difficulty must be defined");
					assert.equal(res, null);
					done();
			});
			});
		});
		
	});
	it('Null/undefined for delete all user workouts', function(done){
		workoutFunctions.deleteAllUserWorkouts(undefined, function(err, data){
			assert.equal(err, null);
			assert.equal(data.succeeded, true);
			done();
		});
	});
	it('Null/undefined for get user', function(done){
		workoutFunctions.getWorkoutById(null, function(err, data){
			assert.equal(err, null);
			assert.equal(data, null);
			done();
		});
	});
	it('Update a workout properly', function(done){
		data = createRandWorkout("bob");
		workoutFunctions.createWorkout("bob", data, function(err, res){
			var workoutID = res._id;
			var newData = createRandWorkout("bob");
			workoutFunctions.updateWorkout(workoutID, newData, function(err, res){
				assert.equal(err, null);
				assert.equal(new Date(res.date).getTime(), newData.date);
				assert.equal(res.difficulty, newData.difficulty);
				assert.equal(res.distance, newData.distance);
				assert.equal(res.totalTime, newData.totalTime);
				done();
			});
		});
	});
	it('Update a workout with invalid data', function(done){
		data = createRandWorkout("bob");
		workoutFunctions.createWorkout("bob", data, function(err, res){
			var workoutID = res._id;
			var newData = createRandWorkout("bob");
			workoutFunctions.updateWorkout(workoutID, null, function(err, res){
				assert.notEqual(err, null);
				assert.equal(res, null);
				done();
			});
		});
	});
	it('Update a nonexistent workout', function(done){
		workoutFunctions.updateWorkout(null, null, function(err, res){
			assert.notEqual(err, "No workout found with id: null");
			assert.equal(res, null);
			done();
		});
	});
});
































