var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.get('/listItems', function (req, res) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            fs.open(fileName,"a",function (err, fd) {
                if(err){
                    res.status(404).send('创建' + fileName + '文件失败！');

                    return;
                }
                res.status(200).end('创建' + fileName + '文件成功！');
            });

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