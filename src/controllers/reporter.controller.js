'use strict';
const Reporter = require('../models/reporter.model');
const bcrypt = require('bcrypt');




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

  // api for creating a reporter
exports.create = function (req, res) {
  const new_reporter = new Reporter(req.body);
  // handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required fields' });
  } else {
    // Check if the email already exists
    Reporter.findByEmail(new_reporter.email, function (err, existingReporter) {
      if (err) {
        res.send(err);
        return;
      }

      if (existingReporter) {
        res.status(400).json({ error: true, message: 'Email already exists' });
        return;
      }

      // Encrypt the password
      bcrypt.hash(new_reporter.password, 10, function (err, hashedPassword) {
        if (err) {
          res.send(err);
          return;
        }

        // Set the encrypted password
        new_reporter.password = hashedPassword;

        // Create the new reporter if the email doesn't exist
        Reporter.create(new_reporter, function (err, reporterId) {
          console.log(new_reporter);
          if (err) {
            res.send(err);
            return;
          }
          res.json({ error: false, message: 'Reporter added successfully!', username: new_reporter.email, userId: reporterId });
        });
      });
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


