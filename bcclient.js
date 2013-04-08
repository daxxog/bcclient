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
    
    var filter = strAllow('1234567890'),
        exts = ['png', 'svg'];
    
    return function(host, port) {
        var that = this;
        
        if(typeof port == 'undefined') {
            port = 80;
        }
        
        if(typeof host == 'undefined') {
            host = '127.0.0.1';
        }
        
        if(typeof port != 'number') {
            return new Error('Port is NaN.');
        }
        
        that.host = host;
        that.port = port;
        
        that._req = function(ext, bc, cb) {
            request({
                url: 'http://' + that.host + ':' + that.port + '/' + filter(bc) + '.' + ext,
                encoding: null
            }, function(err, res, body) {
                if(err) {
                    cb(err);
                } else if(res.statusCode !== 200) {
                    cb(new Error('Invalid status code from server.'));
                } else {
                    cb(err, body);
                }
            });
        };
        
        exts.forEach(function(v, i, a) {
            that[v] = function(bc, cb) {
                that._req(v, bc, cb);
            };
        });
        
        return that;
    };
}));
