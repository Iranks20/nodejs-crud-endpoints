'use strict';
var dbConn = require('../../config/db.config');

var Login = function(login){
    this.email     = login.email;
    this.password      = login.password;
  
  };
try { 
Login.select = function (id, result) {
    dbConn.query(`SELECT * FROM logins WHERE email = ${db.escape(req.body.email)};`, function (err, res ) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
    });
    };
}catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }

module.exports= Login;