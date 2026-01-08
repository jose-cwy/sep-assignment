// model/promotionModel.js (FINAL - same style as your retailproduct model)
var db = require('./databaseConfig.js');

var promotionDB = {
  getPromotionsByCountry: function (countryId) {
    return new Promise((resolve, reject) => {
      var conn = db.getConnection();
      conn.connect(function (err) {
        if (err) {
          conn.end();
          return reject(err);
        }

        var sql = `
        SELECT 
          ID as id,
          DESCRIPTION as description,
          DISCOUNTRATE as discountRate,
          STARTDATE as startDate,
          ENDDATE as endDate,
          IMAGEURL as imageURL,
          COUNTRY_ID as countryId,
          ITEM_ID as itemId
        FROM promotionentity
        WHERE COUNTRY_ID = ?
          AND CURDATE() BETWEEN STARTDATE AND ENDDATE
        ORDER BY STARTDATE DESC;
      `;

        conn.query(sql, [countryId], function (err, result) {
          conn.end();
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  }
  ,
  getPromotionById: function (id) {
    return new Promise((resolve, reject) => {
      var conn = db.getConnection();
      conn.connect(function (err) {
        if (err) {
          console.log(err);
          conn.end();
          return reject(err);
        } else {
          var sql =
            'SELECT ID as id, DESCRIPTION as description, DISCOUNTRATE as discountRate,' +
            ' STARTDATE as startDate, ENDDATE as endDate, IMAGEURL as imageURL,' +
            ' COUNTRY_ID as countryId, ITEM_ID as itemId' +
            ' FROM promotionentity WHERE ID=?;';

          conn.query(sql, [id], function (err, result) {
            if (err) {
              console.log(err);
              conn.end();
              return reject(err);
            } else {
              conn.end();
              if (!result || result.length === 0) return resolve(null);
              return resolve(result[0]);
            }
          });
        }
      });
    });
  }
};

module.exports = promotionDB;
