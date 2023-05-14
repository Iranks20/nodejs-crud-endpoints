'use strict';
const Reporter = require('../models/reporter.model');
exports.findAll = function(req, res) {
Reporter.findAll(function(err, reporter) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', reporter);
  res.send(reporter);
});
};

// counting all reporters
exports.countAllReporters = function(req, res) {
  Reporter.countAllReporters(function(err, reporter) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', JSON.stringify(reporter));
    res.send(JSON.stringify(reporter));
    return;
  });
  };

// dialy reports
exports.dailyReporterz = function(req, res) {
  Reporter.dailyReporterz(function(err, reporter) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', reporter);
    res.send(reporter);
  });
  };

// counting daily reporters
exports.countDailyReporters = function(req, res) {
  Reporter.countDailyReporters(function(err, reporter) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', JSON.stringify(reporter));
    res.send(JSON.stringify(reporter));
    return;
  });
  };

//weekly reporters
exports.weeklyReporterz = function(req, res) {
  Reporter.weeklyReporterz(function(err, reporter) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', reporter);
    res.send(reporter);
  });
  };
// counting weekly reporters
exports.countWeeklyReporters = function(req, res) {
  Reporter.countWeeklyReporters(function(err, reporter) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', JSON.stringify(reporter));
    res.send(JSON.stringify(reporter));
  });
  };

//monthly reporterz
exports.monthlyReporterz = function(req, res) {
  Reporter.monthlyReporterz(function(err, reporter) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', reporter);
    res.send(reporter);
  });
  }; 
// counting monthly reporters
exports.countMonthlyReporters = function(req, res) {
  Reporter.countMonthlyReporters(function(err, reporter) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', JSON.stringify(reporter));
    res.send(JSON.stringify(reporter));
  });
  };

exports.create = function(req, res) {
const new_reporter = new Reporter(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Reporter.create(new_reporter, function(err, reporter) {
  console.log(new_reporter)
  if (err)
  res.send(err);
  res.json({error:false,message:"reporter added successfully!",username: new_reporter.email, userId:reporter});
});
}
};
exports.findById = function(req, res) {
Reporter.findById(req.params.id, function(err, reporter) {
  if (err)
  res.send(err);
  res.json(reporter);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Reporter.update(req.params.id, new Reporter(req.body), function(err, reporter) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'reporter successfully updated' });
});
}
};
// updating on Read and Unread
exports.updateById = function(req, res) {
  Reporter.updateById(req.params.id, function(err) {
    if (err)
    res.send(err);
    res.json({error:false, message: 'status read updated successfully'});
  });
  };


exports.delete = function(req, res) {
Reporter.delete( req.params.id, function(err, reporter) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'reporter successfully deleted' });
});
};


