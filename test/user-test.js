var request = require('supertest');
var server = require('../server');
var chai = require('chai');
var should = require('should');
var assert = chai.assert;

describe('This contains tests for the user model and controller', function() {
    it('Testing a GET request at endpoint /api/users', function(done) {
        request(server)
            .get('/api/users')
            .expect(200)
            .end(function(err, res) {
                done();
            });
    });
    it('Testing a POST request at endpoint /api/users', function(done) {
        request(server)
            .post('/api/users')
            .send("username=Jonathan")
            .send("password=Doe")
            .end(function(err, res) {
                if (err)
                    done(err);
                else {
                    res.status.should.equal(200);
                    res.body.message.should.equal('New user successfully added!');
                    done();
                }
            });
    });

});

server.close();
