'use strict';
var dbConn = require('./../../config/db.config');
//Reporter object create
var Reporter = function(reporter){
    this.first_name     = reporter.first_name;
    this.last_name      = reporter.last_name;
    this.email          = reporter.email;
    this.sex          = reporter.sex;
    this.phone_number   = reporter.phone_number;

};
Reporter.create = function (newEmp, result) {
dbConn.query("INSERT INTO reporters set ?", newEmp, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Reporter.findById = function (id, result) {
dbConn.query("Select * from reporters where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Reporter.findAll = function (result) {
dbConn.query("Select * from reporters", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('reporters : ', res);
  result(null, res);
}
});
};
Reporter.update = function(id, Reporter, result){
dbConn.query("UPDATE reporters SET first_name=?,last_name=?,email=?,sex=?,phone_number=? WHERE id = ?", [Reporter.first_name,Reporter.last_name,Reporter.email,Reporter.sex,Reporter.phone_number, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Reporter.delete = function(id, result){
dbConn.query("DELETE FROM reporters WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Reporter;









