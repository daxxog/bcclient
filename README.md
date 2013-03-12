bcclient
========
BarCode Client

Install
-------
stable
```bash
npm install bcclient
```
edge
```bash
npm install https://github.com/daxxog/bcclient/tarball/master
```

Example
-------
```javascript
var bcclient = require('bcclient')('localhost', 8888),
    fs = require('fs');

bcclient.png('12345', function(err, data) {
    fs.writeFileSync('test.png', data);
});

bcclient.svg('12345', function(err, data) {
    console.log(data.toString());
});
```