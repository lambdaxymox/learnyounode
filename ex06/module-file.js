var fs = require("fs");
var path = require("path");

/* This is idiomatic Node.js code for modules.

    var foo = function (arg1, arg2, ... argN, callback) { ... };

*/
var getFiles = function (pathName, fileExtension, callback) {

    fs.readdir(pathName, function(error, fileList) {
        if (error) {
            return callback(error);
        }

        var filesFound = traverseDirectoryWithExtension(fileExtension, fileList);
        callback(null, filesFound);
    });
};


var traverseDirectoryWithExtension = function (fileExtension, fileList) {
    var filesFound = [];
    var fileEnding = "." + fileExtension;
        
    fileList.forEach(function (file) {
        if (path.extname(file) === fileEnding) {
            filesFound.push(file);
        }
    });

    return filesFound;
};

module.exports = getFiles;