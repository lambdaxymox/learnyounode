var http = require("http");
var bl = require("bl");

var main = function () {
    var url = "";
    
    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js URL");
        console.error("Example 1: node program.js google.com");
        console.error("Example 2: node program.js http://www.google.com/");
        process.exit(1);
    }

    url = process.argv[process.argv.length - 1];
    console.log("Got URL: " + url);
    http.get(url, function (response) {
        response.pipe(bl(function (error, data) {
            if (error) {
                console.error(error);
            }
            var str = data.toString();
            console.log(str.length);
            console.log(str);
        }));
    });
    console.log("done");
};

main();