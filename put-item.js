var express = require('express');
var router = express();
var fs = require("fs");

var getFileName = require('./file-name');

router.put('/products/:id', function (req, res) {
    if (typeof (req.body.barcode) != 'string' || typeof (req.body.name) != 'string' || typeof (req.body.unit) != 'string' || typeof (req.body.price) != 'number') {
        res.status(400).json();
        return;
    }
    fs.readFile(getFileName(), "utf8", function (err, data) {
        var item;
        if (data === '' || data === {}) {
            res.status(404).json();

            return;
        }

        data = JSON.parse(data);

        for (var i = 0; i < data.items.length; i++) {
            if (data.items[i].id.toString() === req.params.id) {
                item = {
                    "id": data.items[i].id,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };
                data.items[i] = item;
            }
        }
        if (item != undefined) {
            fs.writeFile(getFileName(), JSON.stringify(data), function (err) {
            });
            res.status(200).json(item);
        }
        else {
            res.status(404).json();
        }
    });
});

module.exports = router;
