var mysql = require("mysql");

var dbconnect = {
  getConnection: function () {
    return mysql.createConnection({
      host: "127.0.0.1",
      user: "nodeuser",
      password: "NodePass123!",
      database: "islandfurniture-it07"
    });
  }
};

module.exports = dbconnect;
