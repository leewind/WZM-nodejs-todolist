var express = require('express');
var router = express.Router();
var mysql = require('../controller/mysql');

/**
 * @description 向todolist添加数据
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

/**
 * @description 从todolist中删除指定id的数据
 * @param {Request} req 请求对象
 * @param {Response} res 返回对象
 * @return {Response} 返回对象
 */
router.delete('/:id', function (req, res) {
  var params = {
    id : req.param('id'),
  }

  mysql.delete('DELETE FROM list WHERE ?', params)
    .then(
      function (data) {
		res.json({data: data});
	  },
	  function (error) {
		console.error('[ErrorInfo]:'+ error);
		res.json({error: error});
	  }
    );
});

/**
 * @description 从todolist中获取id的数据
 * @param {Request} req 请求对象
 * @param {Response} res 返回对象
 * @return {Response} 返回对象
 */
router.get('/:id', function (req, res) {
  var params = {
    id : req.param('id'),
  }

  mysql.get('SELECT * FROM list WHERE ?', params)
    .then(
      function (data) {
        res.json({data: data});
      },
      function (error) {
        console.error('[ErrorInfo]:' + error);
        res.json({error: error});
	  }
    );
});

/**
 * @description 从todolist中修改id的数据
 * @param {Request} req 请求对象
 * @param {Response} res 返回对象
 * @return {Response} 返回对象
 */
router.put('/:id', function (req, res) {
  var id = req.param('id');
  var params = {
	username : req.param('username'),
	content : req.param('content'),
	level : req.param('level'),
  }

  mysql.update('UPDATE list SET ? WHERE id = ?', [params, id])
    .then(
      function (data) {
        res.json({data: data});
      },
      function (error) {
        console.error('[ErrorInfo]:' + error);
		res.json({error: error});
	  }
	);
});

module.exports = router;
