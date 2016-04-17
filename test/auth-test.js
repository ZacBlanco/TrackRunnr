var request = require('supertest');
var server = require('../server');
var chai = require('chai');
var should = require('should');
var assert = chai.assert;

describe('Test-Suite for user Signup and Authentication', function(done){
	it('Testing SIGNUP without a conflicting username', function(done){
		request(server)
			.get()
	});
	it('Testing SIGNUP with a conflicting username', function(done) {

	})
	it('Testing LOGIN with an existing username', function(done) {

	})
	it('Testing LOGIN with an invalid username', function(done) {

	})
	it('Testing LOGOUT on user', function(done) {

	})
	it('Testing DELETE on user', function(done) {

	})
});
