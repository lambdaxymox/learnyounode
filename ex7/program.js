var http = require("http");


var main = function () {
    var url = "";
    
    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js URL");
        console.error("Example 1: node program.js google.com");
        console.error("Example 2: node program.js http://www.google.com/");
        process.exit(1);
    }

    url = process.argv[process.argv.length - 1];
    //console.log("Got URL: " + url);
    http.get(url, function (response) {
        response.setEncoding('utf-8');
        response.on("data", function (data) {
            console.log(data);
        });
        response.on("error", function(error) {
            console.error(error);
        });
    });

};

main();