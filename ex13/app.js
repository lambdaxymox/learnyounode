var http = require('http');
var url = require('url');

/* This is a bad implementation of URL routing. If I were 
   writing this in production rather than for a node.js exercise,
   I would use Express.js or something similar instead.
*/
var APP = function () {
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

module.exports.defaultView = APP.defaultView;
module.exports.contains = APP.contains;
module.exports.setRoute = APP.setRoute;
module.exports.route = APP.route;