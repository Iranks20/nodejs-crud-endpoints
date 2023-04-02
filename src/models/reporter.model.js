'use strict';
var dbConn = require('./../../config/db.config');
//Reporter object create
var Reporter = function(reporter){
    this.firstName     = reporter.firstName;
    this.lastName      = reporter.lastName;
    this.email          = reporter.email;
    this.sex          = reporter.sex;
    this.phoneNumber   = reporter.phoneNumber;
    this.status      = 'UnRead'

};
// create report
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

// find report by id
Reporter.findById = function (id, result) {
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

// find all reports
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

// counting all reports
Reporter.countAllReporters = function (result) {
  dbConn.query("SELECT COUNT(id) AS total FROM reporters;", function (err, res) {
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

// daily reporters
Reporter.dailyReporterz = function (result) {
  dbConn.query("SELECT * FROM `reporters` WHERE datetime >= curdate()", function (err, res) {
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
// counting daily reports
Reporter.countDailyReporters = function (result) {
  dbConn.query("SELECT COUNT(id) AS total FROM reporters WHERE datetime >= curdate()", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('reporters : ', JSON.stringify(res));
     result(null, res);
  }
  });
  };

// weekly reporters
Reporter.weeklyReporterz = function (result) {
  dbConn.query("select * from reporters where week(datetime)=week(now()))", function (err, res) {
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
  // counting weekly reporters
  Reporter.countWeeklyReporters = function (result) {
    dbConn.query("SELECT COUNT(id) AS total FROM reporters where week(datetime)=week(now())", function (err, res) {
      if(err) {
       console.log("error: ", err);
      result(null, err);
    }
    else{
       console.log('reporters : ', JSON.stringify(res));
       result(null, res);
    }
    });
    };

// monthly reporters
Reporter.monthlyReporterz = function (result) {
  dbConn.query("SELECT * FROM `reporters` WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) {
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
// counting monthly reporters
Reporter.countMonthlyReporters = function (result) {
  dbConn.query("SELECT COUNT(id) AS total FROM reporters WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('reporters : ', JSON.stringify(res));
     result(null, res);
  }
  });
  };

Reporter.update = function(id, Reporter, result){
dbConn.query("UPDATE reporters SET firstName=?,lastName=?,email=?,sex=?,phoneNumber=? WHERE id = ?", [Reporter.firstName,Reporter.lastName,Reporter.email,Reporter.sex,Reporter.phoneNumber, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};

// updating Unread to Read
Reporter.updateById = function (id, result) {
  dbConn.query("update reporters set status = 'Read' where id = ? ", id, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
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









