var fs = require("fs");
var path = require("path");


var callback = function (fileExtension) { 
    return function (error, fileList) {
        if (error) {
            console.error(error);
        } else {
            fileList.forEach(function (file) {
                if (path.extname(file) === "." + fileExtension) {
                    console.log(file);
                }
            });
        }
    }
};

var main = function () {
    var path = "";
    var fileExtension = "";

    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js /PATH/TO/DIR/ FILE_EXTENSION");
        console.error("Example: node program.js /path/to/dir md");
        process.exit(1);
    }

    path = process.argv[process.argv.length - 2];
    fileExtension = process.argv[process.argv.length - 1];

    fs.exists(path, function (exists) {
        if (exists) {
            fs.readdir(path, callback(fileExtension));
        } else {
            console.error("Path not found: " + path);
            process.exit(1);
        }
    });
};

main();