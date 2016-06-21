var express = require('express');
var router = express();
var fs = require("fs");
var getFileName = require('./file-name');

router.delete('/products/:id', function (req, res) {
    fs.readFile(getFileName(), "utf8", function (err, data) {
        if (data === '' || data === {}) {
            res.sendStatus(404);

            return;
        }
        else {
            var newData = JSON.parse(data);
            
            for (var i = 0; i < newData.items.length; i++) {
                if (newData.items[i].id.toString() === req.params.id) {
                    newData.items.splice(i, 1);
                    
                    fs.writeFile(getFileName(), JSON.stringify(data), function (err) {
                    });
                    res.status(204).json();

                    return;
                }
            }
        }

        res.sendStatus(404);

    });
});

module.exports = router;