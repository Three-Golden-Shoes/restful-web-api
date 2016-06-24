var express = require('express');
var router = express();
var fs = require("fs");

var getFileName = require('./file-name');

router.get('/products/:id', function (req, res,next) {
    fs.readFile(getFileName(), "utf8", function (err, data) {
        if(err){
            next(err);
            
            return;
        }
        if (data === '' || data === {}) {
            res.sendStatus(404);
        }
        else {
            var newData = JSON.parse(data);

            for (var i = 0; i < newData.items.length; i++) {
                if (newData.items[i].id.toString() === req.params.id) {
                    var item = newData.items[i];

                    res.status(200).json(item);
                    
                    return;
                }
            }
        }

        res.sendStatus(404);
    });
});

module.exports = router;
