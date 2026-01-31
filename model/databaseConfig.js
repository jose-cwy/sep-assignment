var mysql = require("mysql");

var dbconnect = {
  getConnection: function () {
    return mysql.createConnection({
      host: "127.0.0.1",
      user: "nodeuser",
      password: "password",
      database: "islandfurniture-it07"
    });
  }
};

module.exports = dbconnect;
