var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.delete('/deleteItem/:id', function (req, res) {
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
        delete data["item" + req.params.id]
        fs.writeFile(fileName, JSON.stringify(data), function (err) {
            if (err) {
                res.status(404).end('未找到' + fileName + '文件!');

                return;
            }
        });

        res.status(200).end("删除成功!");
    });
});

module.exports = router;