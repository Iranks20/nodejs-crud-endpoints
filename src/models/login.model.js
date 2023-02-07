'use strict';
var dbConn = require('../../config/db.config');
//login object create
var Login = function(login){
  this.email     = login.email;
  this.password      = login.password;  

};

Login.findById = function (id, result) {
    dbConn.query("Select * from logins where id = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
    });
    };