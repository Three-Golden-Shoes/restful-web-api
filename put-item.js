var express = require('express');
var router = express();
var fs = require("fs");

var getFileName = require('./file-name');

router.put('/products/:id', function (req, res) {
    if (typeof (req.body.barcode) != 'string' ||
        typeof (req.body.name) != 'string' ||
        typeof (req.body.unit) != 'string' ||
        typeof (req.body.price) != 'number') {
        
        res.sendStatus(400);

        return;
    }
    fs.readFile(getFileName(), "utf8", function (err, data) {
        var item;
        if (data === '' || data === {}) {
            res.sendStatus(404);

            return;
        }

        var newData = JSON.parse(data);

        for (var i = 0; i < newData.items.length; i++) {
            if (newData.items[i].id.toString() === req.params.id) {
                item = {
                    "id": newData.items[i].id,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };
                newData.items[i] = item;
                fs.writeFile(getFileName(), JSON.stringify(newData), function (err) {
                });

                res.status(200).json(item);

                return;
            }
        }

        res.sendStatus(404);
    });
});

module.exports = router;
