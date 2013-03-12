/* bcclient
 * BarCode Client
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {
    var request = require('request'),
        strAllow = require('str-allow');
    
    var filter = strAllow('1234567890');
    
    return function(host, port) {
        var that = this;
        
        if(typeof port == 'undefined') {
            port = 80;
        }
        
        if(typeof host == 'undefined') {
            host = 'localhost';
        }
        
        if(typeof port != 'number') {
            return new Error('Port is NaN.');
        }
        
        that.host = host;
        that.port = port;
        
        that.svg = function(bc, cb) {
            request('http://' + that.host + ':' + that.port + '/' + filter(bc) + '.svg', function(err, res, body) {
                if(err) {
                    cb(err);
                } else if(res.statusCode !== 200) {
                    cb(new Error('Invalid status code from server.'));
                } else {
                    cb(err, body);
                }
            });
        };
        
        return that;
    };
}));