var Q          = require('q');
var mysql      = require('mysql');

var connection = null;
var controller = controller || {};

controller.connect = function () {
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'todo'
  });

  return connection;
};

controller.query = function(query){
  var deferred = Q.defer()

  connection.query(query, function(err, rows, fields) {
    if (err) deferred.reject(err);
    else deferred.resolve(rows)
  });

  return deferred.promise;
};

controller.create = function (query, params) {
  var deferred = Q.defer()
  connection.query(query, params, function(err, rows, fields) {
    if (err) deferred.reject(err);
    else deferred.resolve(rows)
  });

  return deferred.promise;
};

controller.delete = function(query, params) {
  var deferred = Q.defer();
  connection.query(query, params, function(err, rows, fields) {
    if (err) deferred.reject(err);
	else deferred.resolve(rows);
  });

  return deferred.promise;
};

controller.get = function(query, params) {
  var deferred = Q.defer();
  connection.query(query, params, function(err, rows, fields) {
    if (err) deferred.reject(err);
	else deferred.resolve(rows);
  });

  return deferred.promise;
}

controller.update = function(query, params) {
  var deferred = Q.defer();
  connection.query(query, params, function(err, rows, fields) {
    if (err) deferred.reject(err);
	else deferred.resolve(rows);
  });

  return deferred.promise;
}

module.exports = controller;
