// controller/promotionentityDB.js (FINAL)
var express = require('express');
var app = express();

var promotion = require('../model/promotionModel.js');

app.get('/api/getPromotionsByCountry', function (req, res) {
  var countryId = req.query.countryId;

  promotion.getPromotionsByCountry(countryId)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to get promotions by country");
    });
});

app.get('/api/getPromotionById', function (req, res) {
  var id = req.query.id;

  promotion.getPromotionById(id)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to get promotion by id");
    });
});

module.exports = app;
