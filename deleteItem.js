var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.delete('/deleteItem/:id', function (req, res) {
    fs.readFile(fileName, "utf8", function (err, data) {
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