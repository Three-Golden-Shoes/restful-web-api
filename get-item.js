var express = require('express');
var router = express();
var fs = require("fs");

var getFileName = require('./file-name');

router.get('/products/:id', function (req, res) {
    fs.readFile(getFileName(), "utf8", function (err, data) {
        if (data === '' || data === {}) {
            res.status(404).json();
        }
        else {

            data = JSON.parse(data);

            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].id.toString() === req.params.id) {
                    var item = data.items[i];
                    break;
                }
            }
            if (i === data.items.length) {
                res.status(404).json();
            }
            res.status(200).json(item);

        }
    });
});

module.exports = router;
