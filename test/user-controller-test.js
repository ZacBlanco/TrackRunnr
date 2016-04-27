var userFunctions = require('../controllers/userController');
var chai = require('chai');
var assert = chai.assert;


//Username for tests
var testUsername = 'bob';
//User object for tests
var testUser = {username: testUsername, password: 'password'};

describe('User Controller Test Suite: ', function(done){
	it('Creates a user', function(done){
		userFunctions.createUser(testUser, function(err, data) {
			assert.equal(err, null);
			assert.equal(data.message, "New user successfully added!");
			assert.equal(data.user.username, 'bob');
			done();
			
		});
	});
	it('Deletes a user and make sure it doesn\'t exist', function(done) {
		userFunctions.deleteUser(testUsername, function(err, data){
			assert.equal(err, null);
			assert.equal(data.message, "User: " + testUsername + " deleted!");
			userFunctions.getUser(testUsername, function(err, data){
				assert.equal(err, null, 'Make sure that error is undefined');
				assert.equal(data.message, 'User: ' + testUsername + " not found!")
				assert.notEqual(data, null, 'Make sure there is no data');
				done();
			});
		});
	});
	it('Gets a user which exists', function(done){
		userFunctions.createUser(testUser, function(err, data) {
			assert.equal(err, null, 'Make sure that user creation has no error');
			assert.equal(data.message, "New user successfully added!");
			assert.equal(data.user.username, testUsername);
			userFunctions.getUser(testUsername, function(err, data){
				assert.equal(err, null);
				assert.notEqual(data, null);
				
				//Finally delete the user
				userFunctions.deleteUser(testUsername, function(err, data){
					assert.equal(err, null);
					assert.equal(data.message, "User: " + testUsername + " deleted!");
					userFunctions.getUser(testUsername, function(err, data){
						assert.equal(err, null, 'Make sure that error is undefined');
						assert.equal(data.message, 'User: ' + testUsername + " not found!")
						assert.notEqual(data, null, 'Make sure there is no data');
						done();
					});
				});
			});
		});
	});
	it('Try to delete a null user which doesn\'t exist', function(done){
		userFunctions.deleteUser(null, function(err, data){
			assert.notEqual(err, null);
			assert.equal(err.message, "Username cannot be null or undefined");
			assert.equal(data, null);
			done();
			
		});
	});
	it('Get a null user which doesn\'t exist', function(done){
		userFunctions.getUser(null, function(err, data){
			assert.notEqual(err, null);
			assert.equal(data, null);
			assert.equal(err.message, 'Username cannot be null or undefined');
			done();
		});
	});
	it('Try to delete a user which doesn\'t exist', function(done){
		userFunctions.deleteUser('userwhichdoesntexist', function(err, data){
			assert.equal(err, null);
			assert.notEqual(data, null);
			assert.equal(data.message, "Username not found. User was not deleted");
			done();
			
		});
	});
	it('Get a user which doesn\'t exist', function(done){
		userFunctions.getUser('userwhichdoesntexist', function(err, data){
			assert.equal(err, null);
			assert.notEqual(data, null);
			assert.equal(data.message, 'User: userwhichdoesntexist not found!');
			done();
		});
	});
	it('Create, Get All, and Delete many users', function(done){
		var u1 = {username:'u1', password:'badPass'};
		var u2 = {username:'u2', password:'badPass'};
		var u3 = {username:'u3', password:'badPass'};
		userFunctions.createUser(u1, function(err, data) {
			assert.equal(err, null);
			assert.equal(data.message, "New user successfully added!");
			assert.equal(data.user.username, 'u1');
			userFunctions.createUser(u2, function(err, data) {
				assert.equal(err, null);
				assert.equal(data.message, "New user successfully added!");
				assert.equal(data.user.username, 'u2');
				userFunctions.createUser(u3, function(err, data) {
					assert.equal(err, null);
					assert.equal(data.message, "New user successfully added!");
					assert.equal(data.user.username, 'u3');
					userFunctions.getAllUsers(function(err, data){
						userFunctions.deleteUser('u1', function(err, data){
							assert.equal(err, null);
							assert.equal(data.message, "User: " + u1.username + " deleted!");
							userFunctions.deleteUser('u2', function(err, data){
								assert.equal(err, null);
								assert.equal(data.message, "User: " + u2.username + " deleted!");
								userFunctions.deleteUser('u3', function(err, data){
									assert.equal(err, null);
									assert.equal(data.message, "User: " + u3.username + " deleted!");
									done();
								});
							});
						});
					});

				});
			});
		});
		
	});
});


























