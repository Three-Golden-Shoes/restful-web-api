var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.get('/Items', function (req, res) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        var j = 0, newData = [];

        if (data === '' || data === []) {
            data = [{"count": 1}];

        }
        else
            data = JSON.parse(data);

        for (var i = 1; i < data.length; i++) {
            newData[j] = data[i];
            j++;
        }
        res.status(200).json(newData);
    });
});

module.exports = router;