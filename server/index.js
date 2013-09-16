var express = require('express');
var path    = require('path');
var Graft   = require('graftjs/server');
var debug   = require('debug')('graft:bootstrap');
var _       = require('underscore');

Graft.directory(path.normalize(__dirname + '/../'));

debug('server.js');
Graft.reqres.setHandler('config:bootstrap', function(opts) {
    var config = opts && opts.bootstrap || {};

    _.defaults(config, {
        publicPath    : path.join(process.cwd(), 'assets'),
        bootstrapPath : path.dirname(require.resolve('bootstrap/package.json'))
    });

    debug('config:bootstrap', config.publicPath, config.bootstrapPath);
    return config;
});

Graft.Server.on('after:mount:static', function(opts) {
    debug('mounting bootstrap assets');
    var config = Graft.request('config:bootstrap', opts);

    this.use('/assets/css', express.static(__dirname + '/assets/css'));
    this.use('/assets/js', express.static(config.bootstrapPath + '/js'));
    this.use('/assets/img', express.static(config.bootstrapPath + '/img'));
}, Graft);
