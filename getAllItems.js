var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.get('/listItems', function (req, res) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            req.status(404).end(fileName + '文件不存在!');

            return;
        }
        if(data === ''){
            res.status(404).end(fileName + '文件中没有商品数据!');

            return;
        }
        data = JSON.parse(data);
        res.status(200).json(data);
    });
});

module.exports = router;