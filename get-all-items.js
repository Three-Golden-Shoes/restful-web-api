var express = require('express');
var router = express();
var fs = require("fs");

var getFileNmae = require('./file-name');

router.get('/products', function (req, res,next) {
    fs.readFile(getFileNmae(), 'utf8', function (err, data) {
        if(err){
            next(err);
            return;
        }

        if (data === '' || data === {}) {
            res.status(200).json([]);

        }
        else {
           var newData = JSON.parse(data);

            res.status(200).json(newData.items);
        }
    });
});

module.exports = router;