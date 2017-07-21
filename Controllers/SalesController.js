var Item = require('../Models/Item.js');
var bodyParser = require('body-parser');

module.exports = function(expressServer) {

    var jsonParser = bodyParser.json();

    //Saving the Item
    expressServer.post('/saveItem', jsonParser, function(req, res) {
        item = new Item({
            isSold: false,
            ItemType: req.body.ItemType,
            PartName: req.body.PartName,
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
        Item.GetAllItems(function(result) {
            res.send(result);
        })
    });

    //Get items based on the query
    expressServer.post('/GetItems', jsonParser, function(req, res) {
        var query = {};
        for (var key in req.body) {
            if ((req.body).hasOwnProperty(key)) {
                var value = (req.body)[key];
                if (value != "" && value != undefined && value != 'null') {
                    query[key] = value;
                }
            }
        };
        Item.GetItems(query, function(result) {
            res.send(result);
        })
    });

    //Update the item
    expressServer.post('/updateItem', jsonParser, function(req, res) {

        item = new Item({
            _id: req.body._id,
            isSold: req.body.isSold,
            ItemType: req.body.ItemType,
            PartName: req.body.PartName,
            Model: req.body.Model,
            Brand: req.body.Brand,
            Price: req.body.Price,
            Location: req.body.Location,
            updatedDate: Date.now()
        });

        item.UpdateItem(function(result) {
            res.send(result);
        });
    })
}