var http = require('http');
var url = require('url');

/* 
   This is a bad implementation of URL routing. If I were 
   writing this in production rather than for a node.js exercise,
   I would use Express.js or something similar instead.
*/
var RoutingTable = function () {
    this.routes = {};
};


RoutingTable.prototype.defaultView = function (queryObj) {
    return JSON.stringify({});
};


RoutingTable.prototype.contains = function (pathName) {
    return this.routes[pathName] !== undefined;
};


RoutingTable.prototype.setRoute = function (pathName, view) {
    this.routes[pathName] = view;
};


RoutingTable.prototype.route = function (request, response) {
    var queryObj = url.parse(request.url, true);
    var view = this.defaultView;
    var result = undefined;

    if (this.contains(queryObj.pathname)) {
        view = this.routes[queryObj.pathname];
        response.writeHead(200, { 'Content-Type': 'application/json' });
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
    }

    result = view(queryObj);
    response.write(result);
    response.end();
};

module.exports.RoutingTable = RoutingTable;