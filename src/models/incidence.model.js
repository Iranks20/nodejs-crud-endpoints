'use strict';
var dbConn = require('../../config/db.config');
//Incidence object create
var Incidence = function(incidence){
  this.incident     = incidence.incident;
  this.location      = incidence.location;
  this.cordinates          = incidence.cordinates;
  this.byWho          = incidence.byWho;
  this.toWhom         = incidence.toWhom;
  this.details       = incidence.details;
  this.status        = 'UnRead'
  // this.details         = incidence.details

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
  dbConn.query("SELECT COUNT(id) AS total FROM incidences;", function (err, res) {
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
  dbConn.query("SELECT COUNT(id) AS total FROM incidences WHERE datetime >= curdate();", function (err, res) {
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
  dbConn.query("select * from incidences where week(datetime)=week(now())", function (err, res) { 
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
  dbConn.query("SELECT COUNT(id) AS total FROM incidences where week(datetime)=week(now())", function (err, res) {
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
  dbConn.query("SELECT COUNT(id) AS total FROM incidences WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) {
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
dbConn.query("UPDATE incidences SET incident=?,location=?,cordinates=?,byWho=?,toWhom=?,details=? WHERE id = ?", [incidence.incident,incidence.location,incidence.cordinates,incidence.byWho,incidence.toWhom,incidence.details, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};

// updating Unread to Read
Incidence.updateById = function (id, result) {
  dbConn.query("update incidences set status = 'Read' where id = ? ", id, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
    result(null, res);
  } 
  });
  };

Incidence.delete = function(id, result){
// dbConn.query("DELETE FROM incidences WHERE id = ?", [id], function (err, res) {
dbConn.query("DELETE a.*, b.* FROM incidences as a, reporters as b WHERE a.id = b.id AND a.id = ?;", [id], function (err, res) {
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