var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.get('/Items/:id', function (req, res) {
    fs.readFile(fileName, "utf8", function (err, data) {
        var item;
        if (data === '' || data === []) {
            data = [{"count": 1}];
        }
        else if (data != [{"count":1}]) {

            data = JSON.parse(data);

            for (var i = 1; i < data.length; i++) {
                if (data[i].id.toString() === req.params.id) {
                    item = data[i];
                    break;
                }
            }
            if(i === data.length){
                res.status(404).json();
                return;
            }
            res.status(200).json(item);
            return;
        }

        res.status(404).json();
    });
});

module.exports = router;
