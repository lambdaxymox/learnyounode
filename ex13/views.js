var moment = require('moment');

var isoTimeView = function (queryObj) {
    var query = queryObj.query;
    if (query["iso"] !== undefined) {
        var date = moment(query.iso, moment.ISO_8601).toDate();
        var clock = { 
            hour: date.getHours(), 
            minute: date.getMinutes(), 
            second: date.getSeconds(),
        };
        return JSON.stringify(clock);
    } else {
        return JSON.stringify({ hour: "", minute: "", second: "" });
    }
};


var unixTimeView = function (queryObj) {
    var query = queryObj.query;
    if (query["iso"] !== undefined) {
        var date = moment(query.iso, moment.ISO_8601).valueOf();
        return JSON.stringify({ unixtime: date });
    } else {
        return JSON.stringify({ unixtime: "" });
    }
};


module.exports.isoTimeView = isoTimeView;
module.exports.unixTimeView = unixTimeView;