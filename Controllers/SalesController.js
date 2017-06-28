var Item = require('../Models/Item.js');
var bodyParser = require('body-parser');

module.exports = function(expressServer) {

    var jsonParser = bodyParser.json();
    expressServer.post('/saveItem', jsonParser, function(req, res) {
        console.log(req.body);
        item = new Item({
            isSold: req.body.isSold,
            Name: req.body.Name,
            Model: req.body.Model,
            Brand: req.body.Brand,
            Price: req.body.Price,
            createdDate: Date.now()
        });

        item.SaveItem(function(err, result) {
            if (err) {
                throw err;
            } else {
                console.log('Item saved succesfully..!!');
            }
        });

        return res.json("Saved..!!");
    });

    expressServer.get('/GetAll', function(req, res) {
        Item.GetAll(function(err, data) {
            if (err) {
                res.json('Get items failed..!!');
                throw err;
            } else {
                res.json(data);
            }
        })
    });
}