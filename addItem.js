var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.post('/addItem', function (req, res) {

    fs.readFile(fileName, "utf8", function (err, data) {
        if (err) {
            req.status(404).end(fileName + '文件不存在!');

            return;
        }
        if(data != ''){
            data = JSON.parse(data);
            var itemid = data['item' + data['count']];
            if (itemid != undefined) {
                res.status(404).end("id为" + req.params.id + "的商品已存在！");

                return;
            }
        }

        else {
            data = {};
            data["count"] = 1;
        }
        var item = {
            "id": data['count'],
            "barcode": "ITEM000005",
            "name": "方便面",
            "unit": "袋",
            "price": 3.50
        };

        data['item' + data['count']] = item;
        data['count'] ++;
        fs.writeFile(fileName, JSON.stringify(data), function (err) {
            if (err) {
                res.status(404).end('未找到' + fileName + '文件!');

                return;
            }
        });
        res.status(200).json(item);
    });
});

module.exports = router;