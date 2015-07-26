var http = require('http');
var routing = require('./routing.js');
var views = require('./views.js');


var app = new routing.RoutingTable();


var main = function () {

    var portNumber = 0;

    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js PORT_NUMBER");
        process.exit(1);
    }

    portNumber = process.argv[2];

    var server = http.createServer(function (request, response) {
        if (request.method !== 'GET') {
            response.writeHead(403, { 'Content-Type': 'application/json' });
            response.end("This is not a GET request");
        } else {
            app.route(request, response);
        }
        
    });

    server.listen(portNumber, function() {
        console.log("Listening for POST requests on port: " + portNumber);
    });

};


// Set up the routes.
app.setRoute("/api/parsetime", views.isoTimeView);
app.setRoute("/api/unixtime", views.unixTimeView);

main();
