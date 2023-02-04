'use strict';
var dbConn = require('../../config/db.config');
//Incidence object create
var Incidence = function(incidence){
  this.incident     = incidence.incident;
  this.location      = incidence.location;
  this.cordinates          = incidence.cordinates;
  this.time          = incidence.time;
  this.date   = incidence.date;
  this.by_who    = incidence.by_who;
  this.to_whom         = incidence.to_whom;
  this.details         = incidence.details

};
Incidence.create = function (newRep, result) {
dbConn.query("INSERT INTO incidences set ?", newRep, function (err, res) {
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
Incidence.findById = function (id, result) {
dbConn.query("Select * from incidences where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Incidence.findAll = function (result) {
dbConn.query("Select * from incidences", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('incidences : ', res);
  result(null, res);
}
});
};
Incidence.update = function(id, incidence, result){
dbConn.query("UPDATE incidences SET incident=?,location=?,cordinates=?,time=?,date=?,by_who=?,to_whom=?,details=? WHERE id = ?", [incidence.incident,incidence.location,incidence.cordinates,incidence.time,incidence.date,incidence.by_who,incidence.to_whom,incidence.incident, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Incidence.delete = function(id, result){
dbConn.query("DELETE FROM incidences WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Incidence;