var express = require('express');
var Graft   = require('graftjs/server');
var debug   = require('debug')('graft:bootstrap');

Graft.on('after:mount:static', function(opts) {
    debug('mounting bootstrap assets');
    this.use('/assets', express.static(__dirname + '/assets'));
}, Graft);
