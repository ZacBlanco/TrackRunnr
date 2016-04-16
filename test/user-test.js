var request = require('supertest');
var server = require('../server');
var chai = require('chai');
var should = require('should');
var assert = chai.assert;
var test_username;

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
            .send("username=Bobdddd")
            .send("password=Doe")
            .end(function(err, res) {
                if (err)
                    done(err);
                else {
                    test_username = res.body.user.username;
                    res.status.should.equal(200);
                    res.body.message.should.equal('New user successfully added!');
                    done();
                };
            });
    });
    it('Testing a GET request at endpoint /api/users/:username', function(done) {
        request(server)
            .delete('/api/users/' + test_username)
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    res.status.should.equal(200);
                    done();
                }
            })
    });
    it('Testing a DELETE request at endpoint /api/users/:username', function(done) {
        request(server)
            .delete('/api/users/' + test_username)
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

server.close();
