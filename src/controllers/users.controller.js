'use strict';
const Users = require('../models/users.model');
exports.findAll = function(req, res) {
Users.findAll(function(err, users) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', users);
  res.send(users);
});
};

exports.create = function(req, res) {
const new_users = new Users(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Users.create(new_users, function(err, users) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Thank you New admin user added",data:users});
});
}
};
exports.findById = function(req, res) {
Users.findById(req.params.id, function(err, users) {
  if (err)
  res.send(err);
  res.json(users);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Users.update(req.params.id, new Users(req.body), function(err, users) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'admin user successfully updated' });
});
}
};
exports.delete = function(req, res) {
Users.delete( req.params.id, function(err, users) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'admin user successfully deleted' });
});
};

