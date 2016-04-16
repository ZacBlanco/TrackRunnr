var request = require('supertest');
var server = require('../server');
var chai = require('chai');
var assert = chai.assert;

describe('This contains tests for the user model and controller', function() {
    it('Testing a GET request at endpoint /api/users', function(done) {
        request(server)
            .get('/api/users')
            .expect(200, done);
    });
    it('Testing a POST request at endpoint /api/users', function(done) {
        var user = {
            username: "John",
            password: "Doe"
        };

        request(server)
            .post('/api/users')
            .send(user)
            .expect("Content-type", /json/)
            .end(function(err, res) {
                if (err)
                    done(err);
                assert(res.statusCode == 200);
                done();
            });
    });
});

server.close();
