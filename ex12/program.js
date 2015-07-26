var http = require('http');
var map = require('through2-map');


var main = function () {

    var portNumber = 0;

    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js PORT_NUMBER");
        process.exit(1);
    }

    portNumber = process.argv[2];

    var server = http.createServer(function (request, response) { 
        if (request.method !== 'POST') {
            response.end("This is not a POST request.");
        } else {
            request.pipe(map(function (chunk) {
                return chunk.toString().toUpperCase();
            })).pipe(response);
        }
    });

    server.listen(portNumber, function() {
        console.log("Listening for POST requests on port: " + portNumber);
    });

};

main();