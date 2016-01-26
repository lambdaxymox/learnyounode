var fs = require("fs");
var moduleFile = require("./module-file.js");


var main = function () {
    var path = "";
    var fileExtension = "";

    if (process.argv.length < 4) {
        console.error("Usage: node [NODE OPTIONS] program.js /PATH/TO/DIR/ FILE_EXTENSION");
        console.error("Example: node program.js /usr/local md");
        process.exit(1);
    }

    pathName = process.argv[process.argv.length - 2];
    fileExtension = process.argv[process.argv.length - 1];

    fs.exists(pathName, function (exists) {
        if (exists) {
            moduleFile(pathName, fileExtension, function(error, filesFound) {
                if (error) {
                    console.error(error);
                }

                filesFound.forEach(function (file) {
                    console.log(file);
                });
            });
        } else {
            console.error("Path not found: " + pathName);
            process.exit(1);
        }
    });
};

main();