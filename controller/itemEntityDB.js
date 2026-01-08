// controller/itementityDB.js
var express = require('express');
var app = express();

var item = require('../model/itemModel.js');

app.get('/api/getItemById', function (req, res) {
  var id = req.query.id;
  var countryId = req.query.countryId;

  item.getItemById(countryId, id)
    .then((result) => {
      if (!result) return res.status(404).json({ message: "Item not found" });
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get item by id" });
    });
});

module.exports = app;
