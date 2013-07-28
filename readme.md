graft-bootstrap
---------------
[![Build Status](https://magnum.travis-ci.com/ONCHoldings/graft-bootstrap.png?token=b72mqMfgb1GT7zp1RCu1&branch=master)](https://magnum.travis-ci.com/ONCHoldings/graft-bootstrap)

This project provides a clean dependency for building a graftjs
site using bootstrap as a visual base layer.

It provides not only a way to access the static files, but provides
a middleware that compiles bootstrap dynamically from the less files,
allowing you to keep only the files of bootstrap that you want to
change in your project repository.

### Installation

    npm install --save graft-bootstrap

### Static Example

The bootstrap.css and bootstrap.js files are provided unmodified.

Add the following lines to your `templates/layout.jade`

    link(rel='stylesheet', href='/assets/css/bootstrap.css')
    
To include the bootstrap.js you could include it in your markup,
but preferably add the following to your `server.js`:

    require('graft-bootstrap');
    var config = Graft.request('config:bootstrap');
    Graft.bundle('vendor', 'bootstrap', config.bootstrapPath);

### Dynamic LESS Example

When you request `assets/css/test.css`, the middleware will
automatically load and compile `assets/less/test.less` for you.

    // server.js
    var Graft = require('graftjs/server');
    require('graft-bootstrap/middleware/Less.graft.js');
    Graft.load(__dirname);
    Graft.start();

    // assets/less/test.less
    @test-color: blue;
    body { background: @test-color; }

    // assets/css/test.css (the output)
    body { background: #0000ff; }

### Dynamic bootstrap override

The LESS source files for bootstrap are also provided in the
source already, so to you can use the `@import` directive to
extend it.

    // assets/less/base.less

    @import 'bootstrap';
    
    // it is important that these are after the import.
    // because bootstrap.less imports it's own defaults first.
    @backgroundColor: red;
    @textColor: blue;

The output is too large to list here, but including `assets/css/base.css` will
result in your customized bootstrap being loaded up.
