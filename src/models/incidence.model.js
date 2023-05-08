'use strict';
var pool = require('../../config/db.config');
const auth = require('../middleware/auth.middleware');

//Incidence object create
var Incidence = function(incidence){
  this.reporter_id = incidence.reporter_id
  this.incident     = incidence.incident;
  this.location      = incidence.location;
  this.cordinates          = incidence.cordinates;
  this.byWho          = incidence.byWho;
  this.toWhom         = incidence.toWhom;
  this.details       = incidence.details;
  this.status        = 'UnRead'
  // this.details         = incidence.details

};
exports.create = [auth, function(req, res) {
  const new_incidence = new Incidence(req.body);
  //handles null error
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  } else {
    new_incidence.reporter_id = req.user.userId; // set reporter_id to the userId decoded from the JWT token
    Incidence.create(new_incidence, function(err, incidence) {
      if (err)
        res.send(err);
      res.json({error:false,message:"Thank you for submitting your incidence successfully. A member from our team will get back to you soon!",data:incidence});
    });
  }
}];
Incidence.findById = function (id, result) {
pool.query("Select * from incidences where id = ? ", id, function (err, res) {
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