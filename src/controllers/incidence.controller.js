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
    console.log('res', incidence);
    res.send(incidence);
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


exports.create = function(req, res) {
const new_incidence = new Incidence(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Incidence.create(new_incidence, function(err, incidence) {
  if (err)
  res.send(err);
  res.json({error:false,message:"incidence added successfully!",data:incidence});
});
}
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
exports.delete = function(req, res) {
Incidence.delete( req.params.id, function(err, incidence) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'incidence successfully deleted' });
});
};

