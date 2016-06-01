var express = require('express');
var app = express();
var fs = require("fs");

var file = 'items.json';

app.get('/listItems', function (req, res) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            res.status(404).end('未找到' + file + '文件!');

            return;
        }
        data = JSON.parse(data);
        res.status(200).json(data);
    });
});

app.get('/listItems/:id', function (req, res) {
    fs.readFile(file, "utf8", function (err, data) {
        if (err) {
            res.status(404).end('未找到' + file + '文件!');

            return;
        }
        data = JSON.parse(data);
        var item = data["item" + req.params.id];
        if (item === undefined) {
            res.status(404).end("未找到该商品!");

            return;
        }
        res.status(200).json(item);
    })
});

app.post('/listItems/:id', function (req, res) {
    var item = {
        "id": req.params.id,
        "barcode": "ITEM000005",
        "name": "方便面",
        "unit": "袋",
        "price": 3.50
    };
    fs.readFile(file, "utf8", function (err, data) {
        if (err) {
            res.status(404).end('未找到' + file + '文件!');

            return;
        }
        data = JSON.parse(data);
        var itemid = data['item' + req.params.id];
        if (itemid != undefined) {
            res.status(404).end("id为" + req.params.id + "的商品已存在！");

            return;
        }
        data['item' + req.params.id] = item;
        fs.writeFile(file, JSON.stringify(data), function (err) {
            if(err){
                res.status(404).end('未找到' + file + '文件!');

                return;
            }
        })
        res.status(200).json(item);
    });
});



var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})