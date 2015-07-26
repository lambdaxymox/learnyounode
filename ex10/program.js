var net = require('net');
var strftime = require('strftime');


var main = function () {

    var portNumber = 0;
    var defaultFormatString = '%F %H:%M';
    var formatString = defaultFormatString;

    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js PORT_NUMBER");
        console.error("Example: node program.js 8000");
        process.exit(1);
    }

    portNumber = process.argv[2];
    
    var server = net.createServer(function (socket) {
        console.log("Request at: " + strftime('%F %T', new Date()));
        socket.write(strftime(formatString, new Date()));
        socket.write('\n', 'utf8');
        socket.end();
    });

    server.listen(portNumber, function () {
        console.log("Server open on port " + portNumber);
    });

};

main();


