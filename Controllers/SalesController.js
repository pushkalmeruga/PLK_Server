var Item = require('../Models/Item.js');
var bodyParser = require('body-parser');

module.exports = function(expressServer) {

    var jsonParser = bodyParser.json();

    //Saving the Item
    expressServer.post('/saveItem', jsonParser, function(req, res) {
        item = new Item({
            isSold: false,
            ItemName: req.body.ItemName,
            CustomerUserName: req.body.CustomerUserName,
            Model: req.body.Model,
            Brand: req.body.Brand,
            Price: req.body.Price,
            MobileNumber: req.body.MobileNumber,
            EmailId: req.body.EmailId,
            Location: req.body.Location,
            createdDate: Date.now()
        });

        item.SaveItem(function(result) {
            res.send(result);
        });
    });

    //Get all items
    expressServer.get('/GetAllItems', function(req, res) {
        Item.GetAll(function(result) {
            res.send(result);
        })
    });

    //Get items based on the query
    expressServer.post('/GetItems', jsonParser, function(req, res) {
        item = new Item({
            _id: 0,
            Name: req.body.Name,
            Model: req.body.Model,
            Brand: req.body.Brand,
            Price: req.body.Price,
            Location: req.body.Location
        });

        Item.GetItems(item, function(result) {
            res.send(result);
        })
    });
}