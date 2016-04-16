var request = require('supertest');
var server = require('../server');
var chai = require('chai');

describe('This contains tests for the user model and controller', function() {
    it('Testing a GET request at endpoint /api/users', function(done) {
        request(server)
            .get('/api/users')
            .expect(200, done);
    });
    it('Testing a POST request at endpoint /api/users', function(done) {
        request(server)
            .get('api/users')
            .expect(200, done);
    })
});

server.close();
