/*jshint unused:false*/
var Graft    = require('graftjs/server');
var utils    = require('graftjs/test/utils.js');
var should   = require('should');
var _        = require('underscore');
var testPort = 8406;
var cwd = process.cwd();

describe('bootstrap less server', function() {
    before(function() {
        process.chdir(__dirname + '/fixture');

        require('../server');
        require('../server/Less.graft.js');

        var bootstrap = {
            bootstrapPath: __dirname + '/fixture/node_modules/bootstrap',
            publicPath: __dirname + '/fixture/assets'
        };

        Graft.load(process.cwd());

        Graft.start({port: testPort, bootstrap: bootstrap});
    });
    describe('should parse a simple less file for us', function() {
        before(utils.requestUrl(testPort, '/assets/css/base.css'));

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
            this.body.should.include('filename: /assets/less/base.less');
        });
    });
    describe('should import local less files', function() {
        before(utils.requestUrl(testPort, '/assets/css/import.css'));

        it ('should return status 200', function() {
            this.resp.should.have.status(200);
        });

        it ('should have a body', function() {
            should.exist(this.body);
        });
        it('response should be css', function() {
            this.resp.should.have.header('content-type', 'text/css; charset=UTF-8');
        });
        it('should be the file we requested', function() {
            this.body.should.include('filename: /assets/less/import.less');
        });
        it('should have imported base.css', function() {
            this.body.should.include('filename: /assets/less/base.less');
        });
    });
    describe('should import external less files', function() {
        before(utils.requestUrl(testPort, '/assets/css/external.css'));

        it ('should return status 200', function() {
            this.resp.should.have.status(200);
        });

        it ('should have a body', function() {
            should.exist(this.body);
        });
        it('response should be css', function() {
            this.resp.should.have.header('content-type', 'text/css; charset=UTF-8');
        });
        it('should be the file we requested', function() {
            this.body.should.include('filename: /assets/less/external.less');
        });
        it('should have imported external bootstrap.less', function() {
            this.body.should.include('filename: /node_modules/bootstrap/less/bootstrap.less');
        });
        it('should have loaded the local override', function() {
            this.body.should.include('filename: /assets/less/variables.less');
        });
        it('should have loaded the external override', function() {
            this.body.should.include('filename: /node_modules/bootstrap/less/variables.less');
        });
        it('should only have used the last included variables', function() {
            this.body.should.include('external-color: #0000ff');
            this.body.should.include('bootstrap-color: #0000ff');
        });

    });

    describe('stop server', utils.stopServer);

    after(function() {
        process.chdir(cwd);
    });
});
