var Q          = require('q');
var mysql      = require('mysql');

var connection = null;
var controller = controller || {};

controller.connect = function () {
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
  });
};

controller.query = function(query){
  if (connection) {
    connection.connect();
    var deferred = Q.defer()

    connection.query(query, function(err, rows, fields) {
      if (err) deferred.reject(err);
      else deferred.resolve(rows[0].solution)
    });

    connection.end();
  }
};

module.exports = controller;