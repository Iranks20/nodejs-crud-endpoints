'use strict';
const Incidence = require('../models/incidence.model');
exports.findAll = function(req, res) {
Incidence.findAll(function(err, incidence) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', incidence);
  res.send(incidence);
});
};

// count of all incidences
exports.findAllCounts = function(req, res) {
  Incidence.findAllCounts(function(err, incidence) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('resss', JSON.stringify(incidence));
    res.send(JSON.stringify(incidence));
    return;
  });
  };

// daily incidences
exports.dailyIncident = function(req, res) {
  Incidence.dailyIncident(function(err, incidence) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', incidence);
    res.send(incidence);
  });
  };

// counting daily incidents
exports.dailyIncidentCounts = function(req, res) {
  Incidence.dailyIncidentCounts(function(err, incidence) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', JSON.stringify(incidence));
    res.send(JSON.stringify(incidence));   
  });
  };

// weekly incidences
exports.weeklyIncident = function(req, res) {
  Incidence.weeklyIncident(function(err, incidence) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', incidence);
    res.send(incidence);
  });
  };

  // weekly incidence counts
  exports.weeklyIncidentCounts = function(req, res) {
    Incidence.weeklyIncidentCounts(function(err, incidence) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', JSON.stringify(incidence));
      res.send(JSON.stringify(incidence));   
    });
    };

// monthly incidences
exports.monthlyIncident = function(req, res) {
  Incidence.monthlyIncident(function(err, incidence) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', incidence);
    res.send(incidence);
  });
  };

// monthly incident counts
exports.monthlyIncidentCounts = function(req, res) {
  Incidence.monthlyIncidentCounts(function(err, incidence) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', JSON.stringify(incidence));
    res.send(JSON.stringify(incidence));   
  });
  };

  // creatting incidence
exports.create = function(req, res) {
const new_incidence = new Incidence(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Incidence.create(new_incidence, function(err, incidence) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Thank you for submitting yut incidence successfully a memebr from our team will get back to you soon!",data:incidence});
});
}
};

// finding incidence by reporter Id
exports.findByReporterId = function(req, res) {
Incidence.findByReporterId(req.params.reporterId, function(err, incidence) {
  if (err)
  res.send(err);
  res.json(incidence);
});
};

exports.findById = function(req, res) {
Incidence.findById(req.params.id, function(err, incidence) {
  if (err)
  res.send(err);
  res.json(incidence);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Incidence.update(req.params.id, new Incidence(req.body), function(err, incidence) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'incidence successfully updated' });
});
}
};

// updating on Read and Unread
exports.updateById = function(req, res) {
  Incidence.updateById(req.params.id, function(err) {
    if (err)
    res.send(err);
    res.json({error:false, message: 'status read updated successfully'});
  });
  };

exports.delete = function(req, res) {
Incidence.delete( req.params.id, function(err, incidence) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'incidence successfully deleted' });
});
};

