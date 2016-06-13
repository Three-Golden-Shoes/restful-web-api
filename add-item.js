var express = require('express');
var router = express();
var fs = require("fs");

var getFileName = require('./file-name');

router.post('/products', function (req, res) {

    if ( typeof (req.body.barcode) != 'string' || typeof (req.body.name) != 'string' || typeof (req.body.unit) != 'string' || typeof (req.body.price) != 'number') {
        res.status(400).json();

        return;
    }
    fs.readFile(getFileName(), "utf8", function (err, data) {
        if (data === '' || data === {}) {
            data = {"indexNumber": 1, "items": []};
        }
        else {
            data = JSON.parse(data);
        }

        var item = {
            "id": data.indexNumber,
            "barcode": req.body.barcode,
            "name": req.body.name,
            "unit": req.body.unit,
            "price": req.body.price
        };

        data.items[data.items.length] = item;

        data.indexNumber++;

        fs.writeFile(getFileName(), JSON.stringify(data), function (err) {
        });
        res.status(201).json(item);
    });
});

module.exports = router;