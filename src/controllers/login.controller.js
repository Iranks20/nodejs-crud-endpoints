'use strict';
const Login = require('../models/login.model');
exports.findById = function(req, res) {
  Login.findById(req.params.id, function(err, login) {
    if (err)
    res.send(err);
    res.json(login);
  });
  };