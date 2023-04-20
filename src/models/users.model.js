'use strict';
var pool = require('../../config/db.config');
//Users object create
var Users = function(users){
  this.name     = users.name;
  this.email      = users.email;
  this.phoneNumber     = users.phoneNumber;
  this.password     = users.password;
  this.company     = users.company;
  this.position      = users.position;
  this.nationality     = users.nationality;
};
Users.create = function (newRep, result) {
pool.query("INSERT INTO userss set ?", newRep, function (err, res) {
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
Users.findById = function (id, result) {
pool.query("Select * from userss where id = ? ", id, function (err, res) {
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

// all users
Users.findAll = function (result) {
pool.query("Select * from userss", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('users : ', res);
  result(null, res);
}
// connection.release();
});
};

// updating users
Users.update = function(id, Users, result) {
  pool.query("SELECT * FROM userss WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length === 0) {
      result({ message: 'User not found' }, null);
    } else {
      pool.query("UPDATE userss SET name=?, email=?, phoneNumber=?, company=?, position=?, nationality=? WHERE id=?", [Users.name, Users.email, Users.phoneNumber, Users.company, Users.position, Users.nationality, id], function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
        // connection.release();
      });
    }
  });
};

// deleting users
Users.delete = function(id, result){
pool.query("DELETE FROM userss WHERE id = ?", [id], function (err, res) {
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

module.exports= Users;