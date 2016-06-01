var express = require('express');
var app = express();

var fs = require("fs");

var getAllItems = require('./getAllItems');

//getAllItems;
app.use('/',getAllItems);

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
