var fs = require('fs');


var countNewLines = function (inputString) {
    return inputString.split('\n').length - 1;
};


var onFailure = function (failureHandler, failureCallback, successHandler, successCallback) {
    return function (error, data) {
        if (error) {
            failureHandler(error, failureCallback);
        } else {
            successHandler(data, successCallback);
        }
    }
};

// Enter callback HELL!!
var defaultCallback = function () {};

var exitCallback = function () {
    process.exit(1);
};

var handleError = function (error, callback) {
    console.error(error);
    callback();
};

var printCount = function (buffer, callback) {
    var count = countNewLines(buffer.toString());
    console.log(count);
};

var main = function () {
    var path = "";

    if (process.argv.length < 3) {
        console.log("Usage: node [NODE OPTIONS] program.js PATH/TO/FILE");
        process.exit(1);
    }

    path = process.argv[process.argv.length - 1]
    fs.readFile(path, function (err, data) {
        onFailure(handleError, exitCallback, printCount, defaultCallback)(err, data);
    });
};

main();
