// small test serverto help debug the running of the fixture.
// not used by tests.

var Graft = require('graftjs/server'),
    path = require('path');

require('../../middleware/Less.graft.js');

Graft.load(__dirname);

var bsPath = path.dirname(require.resolve('bootstrap/package.json'));
Graft.start({
    bootstrap: {
        publicPath: __dirname + '/assets',
        bootstrapPath:bsPath
    }
});
