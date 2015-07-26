var http = require('http');
var fs = require('fs');


var withLogging = function (logger, op) {
    return function (request, response) {
        op(request, response, logger);
    }
};


var noLogger = function () { };


var requestLogger = function (request, response) {
    console.log(new Date() 
        + "\n### Got HTTP request: " + JSON.stringify(request.headers["host"])
        + "\n### HEADERS: " + JSON.stringify(request.headers) + "\n"
    );
};


var responseLogger = function (request, response) {
    console.log(new Date() + "\n### Sent response: " 
        + request.headers["host"] 
        + " " 
        + response.statusCode 
        + " " 
        + response.statusMessage
        + "\n"
    );
};


var main = function () {

    var portNumber = 0;
    var filePath = "foo.js";

    if (process.argv.length < 4) {
        console.error("Usage: node [NODE OPTIONS] program.js PORT_NUMBER FILE_PATH");
        console.error("Example: node program.js 8000 /usr/local/foo.js");
        process.exit(1);
    }

    portNumber = process.argv[2];
    filePath = process.argv[3];

    var server = http.createServer(
        withLogging(requestLogger, function (request, response, op1) {
            op1(request, response);
            withLogging(responseLogger, function (request, response, op2) {
                response.writeHead(200, { 'content-type': 'text/plain' });
                fs.exists(filePath, function (exists) {
                    if (exists) {
                        var fileStream = fs.createReadStream(filePath, {flags: 'r'});
                        fileStream.pipe(response);
                    } else {
                        console.error(new Date() + " ### File not found: " + filePath);
                        response.end();
                    }
                    op2(request, response);
                });
            })(request, response);
        })
    );

    server.listen(portNumber, function () {
        console.log("Listening for requests on port " + portNumber + "\n\n");
    });

};

main();