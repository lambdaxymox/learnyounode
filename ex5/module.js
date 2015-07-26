var fs = require("fs");
var path = require("path");


var traverseDirectoryWithExtension = function (fileExtension) { 
    return function (error, fileList) {
        var filesFound = [];
        var fileEnding = "." + fileExtension;

        if (error) {
            throw error;
        }
        
        fileList.forEach(function (file) {
            if (path.extname(file) === fileEnding) {
                filesFound.push(file);
            }
        });

        return filesFound;
        
    }
};