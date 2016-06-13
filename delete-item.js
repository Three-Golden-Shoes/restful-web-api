var express = require('express');
var router = express();
var fs = require("fs");
var getFileName = require('./file-name');

router.delete('/products/:id', function (req, res) {
    fs.readFile(getFileName(), "utf8", function (err, data) {
        var flag = 0;
        if (data === '' || data === {}) {
            res.status(404).json();
            
            return;
        }
        else {
            data = JSON.parse(data);
            
            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].id.toString() === req.params.id) {
                    data.items.splice(i, 1);
                    
                    fs.writeFile(getFileName(), JSON.stringify(data), function (err) {
                    });
                    res.status(204).json();

                    return;
                }
            }
        }

        res.status(404).json();
    });
});

module.exports = router;