var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sravan@12",
    database:"school"
  });

  module.exports=con