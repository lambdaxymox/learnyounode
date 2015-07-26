var http = require("http");
var bl = require("bl");

/*  
 *  The variables pagesPending tracks the number of outstanding unfinished HTTP
 *  calls there are. When the http constructor terminates, the callback decrements
 *  the outstanding number of pages. That is, we are using APPSTATE to keep track 
 *  of the number of pages that have not finished yet, so that when we are done, we can print
 *  out the results of each page since they will be in the right order.
 */
var APPSTATE = {
    pages: [],
    pagesPending: 0,
};

APPSTATE.push = function (page) {
    this.pages.push(page);
    this.pagesPending += 1;
};

APPSTATE.pagesUnfinished = function () {
    return this.pagesPending;
};

APPSTATE.pageDone = function () {
    this.pagesPending -= 1;
};


function HTMLPage(url, callback) {
    var _page = this;
    _page.data = "";//"### [URL]('" + url + "')\n";
    _page.byteCount = 0;
    http.get(url, function (response) {
        response.setEncoding('utf8');
        response.pipe(bl(function (error, returnedString) {
            if (error) {
                console.error(error);
            }
            _page.data += returnedString;
            _page.byteCount = returnedString.length;
            callback();
        }));
    });
}


var printURLs = function () {
    APPSTATE.pageDone();
    if (APPSTATE.pagesUnfinished() > 0) {
        return;
    }
    APPSTATE.pages.forEach(function (page) {
        console.log(page.data); //+ '\n\n');
    });
};


var main = function () {
    
    var urls = [];

    if (process.argv.length < 3) {
        console.error("Usage: node [NODE OPTIONS] program.js URL1 URL2 ... URLN");
        console.error("Example 1: node program.js google.com bing.com");
        console.error("Example 2: node program.js http://www.google.com/ http://www.bing.com/");
        process.exit(1);
    }

    for (var i = 2; i < process.argv.length; i++) {
        //console.log("Pushing the URL: " + process.argv[i]);
        urls.push(process.argv[i]);
    }

    urls.forEach(function (url) {
        APPSTATE.push(new HTMLPage(url, printURLs));
    });

};

main();
