var http = require('http');
var url = require('url');
var moment = require('moment');


// This is a bad implementation of URL routing. If I were 
// writing this in production rather than for a node.js exercise,
// I would use Express.js or something similar instead.
var APP = {
    routes: {},
};

APP.defaultView = function (queryObj) {
    return JSON.stringify({});
};

APP.contains = function (pathName) {
    return this.routes[pathName] !== undefined;
};

APP.setRoute = function (pathName, view) {
    this.routes[pathName] = view;
};

APP.route = function (request, response) {
    var queryObj = url.parse(request.url, true);
    var view = APP.defaultView;
    var result = undefined;

    if (APP.contains(queryObj.pathname)) {
        view = APP.routes[queryObj.pathname];
        response.writeHead(200, { 'Content-Type': 'application/json' });
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
    }

    result = view(queryObj);
    response.write(result);
    response.end();
};


var isoTimeView = function (queryObj) {
    var query = queryObj.query;
    if (query["iso"] !== undefined) {
        //var date = moment(query.iso, "YYYY-MM-DDTHH:mm:ss").toDate();
        var date = moment(query.iso, moment.ISO_8601).toDate();
        var clock = { 
            hour: date.getHours(), 
            minute: date.getMinutes(), 
            second: date.getSeconds(),
        };
        return JSON.stringify(clock);
    } else {
        return JSON.stringify({ hour: "", minute: "", second: "" });
    }
};

var unixTimeView = function (queryObj) {
    var query = queryObj.query;
    if (query["iso"] !== undefined) {
        //var unixtime = moment(query.iso, "YYYY-MM-DDTHH:mm:ss").unix();
        var date = moment(query.iso, moment.ISO_8601).valueOf();
        return JSON.stringify({ unixtime: date });
    } else {
        return JSON.stringify({ unixtime: "" });
    }
};


var main = function () {

    var portNumber = 0;

    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js PORT_NUMBER");
        process.exit(1);
    }

    portNumber = process.argv[2];

    var server = http.createServer(function (request, response) {
        if (request.method !== 'GET') {
            response.writeHead(403, "This is not a GET request");
            response.end("This is not a GET request");
        } else {
            APP.route(request, response);
        }
    });

    server.listen(portNumber, function() {
        console.log("Listening for POST requests on port: " + portNumber);
    });

};

// Set up the routes.
APP.setRoute("/api/parsetime", isoTimeView);
APP.setRoute("/api/unixtime", unixTimeView);

main();
