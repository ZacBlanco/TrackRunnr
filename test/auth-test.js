var request = require('supertest');
var server = require('../server');
var chai = require('chai');
var should = require('should');
var jsdom = require('jsdom');
var assert = chai.assert;

/*
describe('Test-Suite for user Signup and Authentication', function(done){
	it('Testing SIGNUP without a conflicting username', function(done){
		var account = {
			username: 'pol',
			password: 'pol'
		};
		request(server)
			.post('/signup')
			.type('form')
			.send(account)
			.end(function(err, res) {
				if (err)
					done(err);
				// Follow the redirect
				var redirectLocation = res.header.location;
				assert(redirectLocation === '/');
				done();
			});
	});
	it('Testing SIGNUP with a conflicting username', function(done) {
		var account = {
			username: 'pol',
			password: 'pol'
		};

		request(server)
			.post('/signup')
			.type('form')
			.send(account)
			.end(function(err, res) {
				console.log(res.body);
				done();
			});
	})
	it('Testing LOGIN with an existing username', function(done) {

	})
	it('Testing LOGIN with an invalid username', function(done) {

	})
	it('Testing LOGOUT on user', function(done) {

	})
	it('Testing DELETE on user', function(done) {
		request(server)
			.post('/deleteUser')
			.type('form')
			.send({ username: 'pol'})
			.end(function(err, res) {
				if (err)
					done(err);
				console.log(res.text);
				done();
			})
	})
});
*/
