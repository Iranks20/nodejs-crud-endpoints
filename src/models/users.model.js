'use strict';
var dbConn = require('../../config/db.config');
//Users object create
var Users = function(users){
  this.name     = users.name;
  this.email      = users.email;
  this.phoneNumber     = users.phoneNumber;
  this.password     = users.password;
  this.company     = users.company;
  this.position      = users.position;
  this.nationality     = users.nationality;
};
Users.create = function (newRep, result) {
dbConn.query("INSERT INTO userss set ?", newRep, function (err, res) {
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
Users.findById = function (id, result) {
dbConn.query("Select * from userss where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
} 
});
};

// all users
Users.findAll = function (result) {
dbConn.query("Select * from userss", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('users : ', res);
  result(null, res);
}
});
};

// updating users
Users.update = function(id, Users, result){
dbConn.query("UPDATE userss SET name=?,email=?,phoneNumber=?,password=?,company=?,position=?,nationality=? WHERE id = ?", [Users.name,Users.email,Users.phoneNumber,Users.password,Users.company,Users.position,Users.nationality, id], function (err, res) {
if(err) {
    console.log("error: ", err);
    result(null, err);
}else{
    result(null, res);
}
});
};

// deleting users
Users.delete = function(id, result){
dbConn.query("DELETE FROM userss WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};

module.exports= Users;