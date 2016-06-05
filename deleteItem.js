var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.delete('/Item/:id', function (req, res) {
    fs.readFile(fileName, "utf8", function (err, data) {
        var newData = [];
        var flag = 0;
        if (data === '' || data === [] || data === [{"count": 1}]) {
            data === [{"count": 1}];

            res.status(404).json();
            return;
        }
        data = JSON.parse(data);
        var j = 0;
        newData[j] = data[0];
        for (var i = 1; i < data.length; i++) {
            if (data[i].id.toString() != req.params.id) {
                j++;
                newData[j] = data[i];
            }
            else
                flag = 1;
        }

        if (flag === 0) {
            res.status(404).json();
            return;
        }
        fs.writeFile(fileName, JSON.stringify(newData), function (err) {
        });

        res.status(204).json();
    });
});

module.exports = router;