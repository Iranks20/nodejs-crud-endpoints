'use strict';
var pool = require('../../config/db.config');
//Incidence object create
var Incidence = function(incidence){
  this.reporterId = incidence.reporterId
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
pool.query("INSERT INTO incidences set ?", newRep, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
// connection.release();
});
};

// incidence by reporter id
Incidence.findByReporterId = function (reporterId, result) {
  pool.query("Select * from incidences where reporterId = ? ", reporterId, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
    result(null, res);
  }
  // connection.release();
  });
  };

Incidence.findById = function (id, result) {
pool.query("Select * from incidences where id = ? ", id, function (err, res) {
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
pool.query("Select * from incidences", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('incidences : ', res);
  result(null, res);
}
// connection.release();
});
};

// count of all incidences
Incidence.findAllCounts = function (result) {
  pool.query("SELECT COUNT(id) AS total FROM incidences;", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidencessss : ', JSON.stringify(res));
     result(null, res);
  }
  // connection.release();
  });
  };

// dialy incidences
Incidence.dailyIncident = function (result) {
  pool.query("SELECT * FROM `incidences` WHERE datetime >= curdate()", function (err, res) { 
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('incidences : ', res);
  result(null, res);
}
// connection.release();
});
};

// counting daily incidences
Incidence.dailyIncidentCounts = function (result) {
  pool.query("SELECT COUNT(id) AS total FROM incidences WHERE datetime >= curdate();", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidencessss : ', JSON.stringify(res));
     result(null, res);
  }
  // connection.release();
  });
  };

// weekly incidences
Incidence.weeklyIncident = function (result) {
  pool.query("select * from incidences where week(datetime)=week(now())", function (err, res) { 
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('incidences : ', res);
  result(null, res);
}
// connection.release();
});
};

// counting weekly incidence
Incidence.weeklyIncidentCounts = function (result) {
  pool.query("SELECT COUNT(id) AS total FROM incidences where week(datetime)=week(now())", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidence : ', JSON.stringify(res));
     result(null, res);
  }
  // connection.release();
  });
  };

// monthly incidence
Incidence.monthlyIncident = function (result) {
  pool.query("SELECT * FROM `incidences` WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) { 
// pool.query("Select * from incidences", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('incidences : ', res);
  result(null, res);
}
// connection.release();
});
};

// monthly incident count
Incidence.monthlyIncidentCounts = function (result) {
  pool.query("SELECT COUNT(id) AS total FROM incidences WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('incidence : ', JSON.stringify(res));
     result(null, res);
  }
  // connection.release();
  });
  };

// incidence record end

Incidence.update = function(id, incidence, result){
pool.query("UPDATE incidences SET incident=?,location=?,cordinates=?,byWho=?,toWhom=?,details=? WHERE id = ?", [incidence.incident,incidence.location,incidence.cordinates,incidence.byWho,incidence.toWhom,incidence.details, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
// connection.release();
});
};

// updating Unread to Read
Incidence.updateById = function (id, result) {
  pool.query("update incidences set status = 'Read' where id = ? ", id, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
    result(null, res);
  }
  // connection.release();
  });
  };

Incidence.delete = function(id, result){
// pool.query("DELETE FROM incidences WHERE id = ?", [id], function (err, res) {
pool.query("DELETE a.*, b.* FROM incidences as a, reporters as b WHERE a.id = b.id AND a.id = ?;", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
// connection.release();
});
};

module.exports= Incidence;