var request = require('supertest');
var server = require('../server');
var chai = require('chai');

describe('This describes a set of tests in set1', function() {
	it('This is a description of test1 in set1', function(done) {
		request(server)
			.get('/api/example')
			.expect(200, done);
	});
	it('Description of Test2 in set1', function(done) {
		request(server)
			.get('/api/example')
			.expect(404, done);
	});

});

server.close();
//process.exit(0);
