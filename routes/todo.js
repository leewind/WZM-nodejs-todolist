var express = require('express');
var router = express.Router();
var mysql = require('../controller/mysql');

/**
 * @description 获得todolist所有的列表数据，不做分页处理
 * @param {Request} req 请求对象
 * @param {Response} res 返回对象
 * @return {Response} 返回对象
 */
router.post('/', function (req, res) {
  var params = {
    username: req.param('username'),
    content: req.param('content'),
    level: req.param('level')
  }

  mysql.create('INSERT INTO list SET ?', params)
    .then(
      function (data) {
        res.json({id: data.insertId});
      },
      function (error) {
        console.error('[ErrorInfo]:'+ error)
        res.json({error: error})
      }
    );
});

/**
 * @description 获得todolist所有的列表数据，不做分页处理
 * @param {Request} req 请求对象
 * @param {Response} res 返回对象
 * @return {Response} 返回对象
 */
router.get('/', function (req, res) {
  mysql.query('SELECT * FROM list')
    .then(
      function (data) {
        res.json({data: data});
      },
      function (error) {
        console.error('[ErrorInfo]:'+ error)
        res.json({error: error})
      }
    );
});

module.exports = router;