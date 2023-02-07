
'use strict';
const Login = require('../models/login.model');
exports.findAll = function(req, res) {
Login.findAll(function(err, login) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', login);
  res.send(login);
});
};

exports.findById = function(req, res) {
    Login.findById(req.params.id, function(err, login) {
      if (err)
      res.send(err);
      res.json(login);
    });
    };