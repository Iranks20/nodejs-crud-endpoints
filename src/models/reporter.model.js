'use strict';
var pool = require('./../../config/db.config');
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
pool.query("INSERT INTO reporters set ?", newEmp, function (err, res) {
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

// find report by id
Reporter.findById = function (id, result) {
pool.query("Select * from logins where id = ? ", id, function (err, res) {
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

// find all reports
Reporter.findAll = function (result) {
pool.query("Select * from reporters", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('reporters : ', res);
  result(null, res);
}
// connection.release();
});
};

// counting all reports
Reporter.countAllReporters = function (result) {
  pool.query("SELECT COUNT(id) AS total FROM reporters;", function (err, res) {
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

// daily reporters
Reporter.dailyReporterz = function (result) {
  pool.query("SELECT * FROM `reporters` WHERE datetime >= curdate()", function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    console.log('reporters : ', res);
    result(null, res);
  }
  // connection.release();
  });
  };
// counting daily reports
Reporter.countDailyReporters = function (result) {
  pool.query("SELECT COUNT(id) AS total FROM reporters WHERE datetime >= curdate()", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('reporters : ', JSON.stringify(res));
     result(null, res);
  }
  // connection.release();
  });
  };

// weekly reporters
Reporter.weeklyReporterz = function (result) {
  pool.query("select * from reporters where week(datetime)=week(now())", function (err, res) { 
    if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    console.log('reporters : ', res);
    result(null, res);
  }
  // connection.release();
  });
  };
  // counting weekly reporters
  Reporter.countWeeklyReporters = function (result) {
    pool.query("SELECT COUNT(id) AS total FROM reporters where week(datetime)=week(now())", function (err, res) {
      if(err) {
       console.log("error: ", err);
      result(null, err);
    }
    else{
       console.log('reporters : ', JSON.stringify(res));
       result(null, res);
    }
    // connection.release();
    });
    };

// monthly reporters
Reporter.monthlyReporterz = function (result) {
  pool.query("SELECT * FROM `reporters` WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    console.log('reporters : ', res);
    result(null, res);
  }
  // connection.release();
  });
  };
// counting monthly reporters
Reporter.countMonthlyReporters = function (result) {
  pool.query("SELECT COUNT(id) AS total FROM reporters WHERE  datetime >=  DATE_FORMAT(CURDATE() ,'%Y-%m-01')", function (err, res) {
  if(err) {
     console.log("error: ", err);
    result(null, err);
  }
  else{
     console.log('reporters : ', JSON.stringify(res));
     result(null, res);
  }
  // connection.release();
  });
  };

Reporter.update = function(id, Reporter, result){
pool.query("UPDATE reporters SET firstName=?,lastName=?,email=?,sex=?,phoneNumber=? WHERE id = ?", [Reporter.firstName,Reporter.lastName,Reporter.email,Reporter.sex,Reporter.phoneNumber, id], function (err, res) {
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
Reporter.updateById = function (id, result) {
  pool.query("update reporters set status = 'Read' where id = ? ", id, function (err, res) {
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

Reporter.delete = function(id, result){
pool.query("DELETE FROM reporters WHERE id = ?", [id], function (err, res) {
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


module.exports= Reporter;









