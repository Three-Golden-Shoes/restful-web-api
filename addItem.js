var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.post('/Item', function (req, res) {

    if (req.body.barcode === undefined || req.body.name === undefined || req.body.unit === undefined || req.body.price === undefined
        || typeof (req.body.barcode) != 'string' || typeof (req.body.name) != 'string' || typeof (req.body.unit) != 'string' || typeof (req.body.price) != 'number') {
        res.status(401).json();
        return;
    }
    fs.readFile(fileName, "utf8", function (err, data) {
        if (data === '' || data === []) {
            data = [{"count": 1}];

        }

        else if(data != [{"count":1}]){
            data = JSON.parse(data);
        }

        var item = {
            "id": data[0].count,
            "barcode": req.body.barcode,
            "name": req.body.name,
            "unit": req.body.unit,
            "price": req.body.price
        };

        data[data.length] = item;

        data[0].count++;

        fs.writeFile(fileName, JSON.stringify(data), function (err) {
        });
        res.status(201).json(item);
    });
});

module.exports = router;