/*jshint unused:false*/
var Graft    = require('graftjs/server');
var utils    = require('graftjs/test/utils.js');
var should   = require('should');
var _        = require('underscore');
var testPort = 8405;

describe('bootstrap static middleware', function() {
    before(function() {

        require('../index.js');
        Graft.start({port: testPort});
    });
    describe('should give me the bootstrap css when i request it', function() {
        before(utils.requestUrl(testPort, '/assets/css/bootstrap.css'));

        it ('should return status 200', function() {
            this.resp.should.have.status(200);
        });

        it ('should have a body', function() {
            should.exist(this.body);
        });
        it('response should be css', function() {
            this.resp.should.have.header('content-type', 'text/css; charset=UTF-8');
        });
        it('should be the right contents', function() {
            this.body.should.include('Bootstrap');
        });
    });
    describe('should give me the bootstrap js when i request it', function() {
        before(utils.requestUrl(testPort, '/assets/js/bootstrap.js'));

        it ('should return status 200', function() {
            this.resp.should.have.status(200);
        });

        it ('should have a body', function() {
            should.exist(this.body);
        });
        it('response should be javascript', function() {
            this.resp.should.have.header('content-type', 'application/javascript');
        });
        it('should be the right contents', function() {
            this.body.should.include('http://twitter.github.com/bootstrap/');
        });
    });
});
