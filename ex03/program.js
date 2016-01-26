var fs = require('fs');

var countNewLines = function (inputString) {
    var lines = inputString.split('\n');
    return lines.length - 1;
};


var readStringFromFile = function (handle) {
    var size = fs.fstatSync(handle).size,
        buf = new Buffer(size);

    fs.readSync(handle, buf, 0, size, 0);
    return buf.toString();
};


var main = function () {
    var path = "";
    var size = 0;
    var file;

    if (process.argv.length < 3) {
        console.log("USAGE: node [NODE OPTIONS] program.js PATH/TO/FILE");
    }

    path = process.argv[process.argv.length - 1];
    try {
        file = fs.openSync(path, 'r');
    } catch (e) {
        console.error(e);
        console.error("Error reading file: " + path);
        process.exit(1);
    }

    var str = readStringFromFile(file);

    console.log(countNewLines(str));
    process.exit();
};

main();
