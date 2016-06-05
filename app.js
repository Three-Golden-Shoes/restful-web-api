var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

var fileName = 'items.json';

fs.stat(fileName, function (err, stat) {
    if ((stat && stat.isFile())) {
        console.log();
    } else {
        fs.open(fileName, "a", function (err, fd) {
            if (err) {
                console.log('创建失败！');
                return;
            }
        });
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var getAllItems = require('./getAllItems');
var getItem = require('./getItem');
var addItem = require('./addItem');
var putItem = require('./putItem');
var deleteItem = require('./deleteItem');

app.use('/', getAllItems);
app.use('/', getItem);
app.use('/', addItem);
app.use('/', putItem);
app.use('/', deleteItem);

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
