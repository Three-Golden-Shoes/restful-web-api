var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.get('/listItems/:id', function (req, res) {
    fs.readFile(fileName, "utf8", function (err, data) {
        if (err) {
            req.status(404).end(fileName + '文件不存在!');

            return;
        }
        data = JSON.parse(data);
        var item = data["item" + req.params.id];
        if (item === undefined) {
            res.status(404).end("未找到该商品!");

            return;
        }
        res.status(200).json(item);
    });
});

module.exports = router;
