var Item = require('../Models/Item.js');
var bodyParser = require('body-parser');

module.exports = function(expressServer) {

    var jsonParser = bodyParser.json();

    //Saving the Item
    expressServer.post('/saveItem', jsonParser, function(req, res) {
        item = new Item({
            isSold: req.body.isSold,
            Name: req.body.Name,
            Model: req.body.Model,
            Brand: req.body.Brand,
            Price: req.body.Price,
            MobileNumber: req.body.MobileNumber,
            EmailId: req.body.EmailId,
            createdDate: Date.now()
        });

        item.SaveItem(function(result) {
            res.send(result);
        });
    });

    expressServer.get('/GetAllItems', function(req, res) {
        Item.GetAll(function(result) {
            res.send(result);
        })
    });
}