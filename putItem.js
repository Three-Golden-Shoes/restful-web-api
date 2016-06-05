var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.put('/Item/:id', function (req, res) {
    if (req.body.barcode === undefined || req.body.name === undefined || req.body.unit === undefined || req.body.price === undefined
        || typeof (req.body.barcode) != 'string' || typeof (req.body.name) != 'string' || typeof (req.body.unit) != 'string' || typeof (req.body.price) != 'number') {
        res.status(401).json();
        return;
    }
    fs.readFile(fileName, "utf8", function (err, data) {
        var item;
        if (data === '' || data === [] || data === [{"count": 1}]) {
            data = [{"count": 1}];
            res.status(404).json();

            return;
        }

        data = JSON.parse(data);

        for (var i = 1; i < data.length; i++) {
            if (data[i].id.toString() === req.params.id) {
                item = {
                    "id": req.params.id,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };
                data[i] = item;
            }
        }
        fs.writeFile(fileName, JSON.stringify(data), function (err) {
        });
        if (item != undefined)
            res.status(201).json(item);
        else
            res.status(404).json();
    });
});

module.exports = router;
