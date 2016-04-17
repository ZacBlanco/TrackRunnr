var request = require('supertest');
var server = require('../server');
var chai = require('chai');
var should = require('should');
var assert = chai.assert;


var workoutUser = "workout-user";
var workoutTime = Date.now();

var workoutData = {
			username: workoutUser,
			date: workoutTime,
			difficulty: 6,
			totalTime: 1000000,
			distance: 10
};
var badWorkoutData = {
	username: undefined,
	date: workoutTime,
	difficulty: undefined,
	totalTime: undefined,
	distance: undefined
};
var workoutID;

describe('Workouts Controller', function(done) {
	before(function(done) {
		var userData = { username: workoutUser, password: 'password'}
		//Perform post to create a new user
		request(server).post('/api/users')
			.send("username=" + workoutUser)
			.send("password=Doe")
			.end(function(err, res) {
				if(!err){
					res.status.should.equal(200);
					done();
				} else {
					done(err);
				}
		});
	})
	
	it('Successful POST to :username/workouts', function(done) {
		request(server).post('/api/users/' + workoutUser + "/workouts")
			.type('form')
			.send(workoutData)
		.expect('Content-Type', /json/)
		.end(function(err, res) {
			res.status.should.equal(200);
			res.body.message.should.equal("Workout Saved Successfully!");
			res.body.username.should.equal(workoutUser);
			res.body.id.should.not.equal(undefined);
			workoutID = res.body.id;
			done();
			
		});
	});
	
	it('Successful GET to :username/workouts', function(done) {
		request(server).get('/api/users/' + workoutUser + "/workouts")
		.end(function(err, res) {
			res.status.should.equal(200);
			for(i = 0; i < res.body.length; i++) {
				if(res.body[i].id == workoutID){
					res.body.username.should.equal(workoutData.username);
					res.body.date.should.equal(workoutData.date);
					res.body.difficulty.should.equal(workoutData.difficulty);
					res.body.totalTime.should.equal(workoutData.totalTime);
					res.body.distance.should.equal(workoutData.distance);
				}
			}
			
			done();
			
		});
	});
	it('Malformed POST to :username/workouts', function(done) {
		request(server).post('/api/users/' + workoutUser + "/workouts")
			.type('form')
			.send(badWorkoutData)
		.expect('Content-Type', /json/)
		.end(function(err, res) {
//			console.log(res.body);
			res.status.should.equal(400);
			res.body.message.should.not.equal("Workout Saved Successfully!");
			assert.equal(res.body.id, undefined, 'Makes sure workout id is undefined');
			done();
		});
	});
	it('DELETE :username/workouts', function(done) {
		request(server).delete('/api/users/' + workoutUser + "/workouts")
			.type('form')
			.send({username: workoutUser})
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.message.should.equal("All workouts under workout-user deleted")
				done();
		});
	});
	after(function(done) {
		//Delete the workout user
		request(server)
            .delete('/api/users/' + workoutUser)
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    res.status.should.equal(200);
                    done();
                }
            });
	});
});