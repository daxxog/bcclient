var bcclient = require('./bcclient')('localhost', 8888);

bcclient.svg('12345', function(err, data) {
    console.log(data);
});