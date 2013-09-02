// bootstrap less middleware
var express= require('express'),
    less = require('less-middleware'),
    path = require('path'),
    http = require('http'),
    app= express();

var _express = express();
this.express = _express;
_.extend(this, _express);

require('../server'); // needed for the static routes

this.addInitializer(function(opts) {
    debug('config bootstrap');
    var config = Graft.request('config:bootstrap', opts);
    var paths = _(Graft.directories).map(function(dir) {
        return path.join(dir, 'assets', 'less');
    });

    paths.unshift(path.join(config.publicPath, 'less'));
    paths.push(path.join(config.bootstrapPath, 'less'));

    this.use(less({
        src    : config.publicPath + '/less' ,
        dest    : config.publicPath + '/css',
        paths  : _(paths).uniq(),
        prefix: '/assets/css'
    }));
});


Graft.on('before:mount:static', function(opts) {
    debug('Mounting less path');
    Graft.use(this);
}, this);
