// model/itemModel.js
var db = require('./databaseConfig.js');

var itemDB = {
  getItemById: function (countryId, id) {
    return new Promise((resolve, reject) => {
      var conn = db.getConnection();
      conn.connect(function (err) {
        if (err) {
          console.log(err);
          conn.end();
          return reject(err);
        }

        id = (id !== undefined && id !== null) ? String(id).trim() : "";
        if (id === "") {
          conn.end();
          return resolve(null);
        }

        // NOTE:
        // - IMAGEURL is only in retailproductentity (for Retail Products)
        // - price is optional (LEFT JOIN by country)
        var sql =
          'SELECT i.ID as id, i.NAME as name, i.SKU as sku, i.DESCRIPTION as description,' +
          ' i.TYPE as type, i.CATEGORY as category,' +
          ' COALESCE(rp.IMAGEURL, "") as imageURL,' +
          ' ic.RETAILPRICE as price' +
          ' FROM itementity i' +
          ' LEFT JOIN retailproductentity rp ON rp.ID = i.ID' +
          ' LEFT JOIN item_countryentity ic ON ic.ITEM_ID = i.ID AND ic.COUNTRY_ID = ?' +
          ' WHERE i.ISDELETED = FALSE AND i.ID = ?;';

        conn.query(sql, [countryId, id], function (err, result) {
          if (err) {
            console.log(err);
            conn.end();
            return reject(err);
          }

          conn.end();
          if (!result || result.length === 0) return resolve(null);
          return resolve(result[0]);
        });
      });
    });
  }
};

module.exports = itemDB;
