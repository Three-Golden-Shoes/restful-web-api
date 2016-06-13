var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");

var getFileName = require('./file-name');

fs.stat(getFileName(), function (err, stat) {
    if ((stat && stat.isFile())) {
    } else {
        fs.open(getFileName, "a", function (err, fd) {
            if (err) {
                console.log('创建失败！');
            }
        });
    }
});

app.use(bodyParser.json());

app.use('/', require('./get-all-items'));
app.use('/', require('./get-item'));
app.use('/', require('./add-item'));
app.use('/', require('./put-item'));
app.use('/', require('./delete-item'));

var server = app.listen(3000);
