'use strict';
var dbConn = require('../../config/db.config');
//Incidence object create
var Incidence = function(incidence){
  this.incident     = incidence.incident;
  this.location      = incidence.location;
  this.cordinates          = incidence.cordinates;
  this.by_who          = incidence.by_who;
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

// all incidences
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

// count of all incidences
Incidence.findAllCounts = function (result) {
  dbConn.query("SELECT COUNT(id) AS number_workers FROM incidences;", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidencessss : ', JSON.stringify(res));
     result(null, res);
  }
  });
  };

// dialy incidences
Incidence.dailyIncident = function (result) {
  dbConn.query("SELECT * FROM `incidences` WHERE datetime >= curdate()", function (err, res) { 
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

// counting daily incidences
Incidence.dailyIncidentCounts = function (result) {
  dbConn.query("SELECT COUNT(id) AS numbe_workers FROM incidences WHERE datetime >= curdate();", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidencessss : ', JSON.stringify(res));
     result(null, res);
  }
  });
  };

// weekly incidences
Incidence.weeklyIncident = function (result) {
  dbConn.query("select * from incidences where  `datetime` >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)", function (err, res) { 
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

// counting weekly incidence
Incidence.weeklyIncidentCounts = function (result) {
  dbConn.query("SELECT COUNT(id) AS number_workers FROM incidences where  `datetime` >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidence : ', JSON.stringify(res));
     result(null, res);
  }
  });
  };

// monthly incidence
Incidence.monthlyIncident = function (result) {
  dbConn.query("SELECT * FROM `incidences` WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) { 
// dbConn.query("Select * from incidences", function (err, res) {
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

// monthly incident count
Incidence.monthlyIncidentCounts = function (result) {
  dbConn.query("SELECT COUNT(id) AS number_workers FROM incidences WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidence : ', JSON.stringify(res));
     result(null, res);
  }
  });
  };

// incidence record end

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