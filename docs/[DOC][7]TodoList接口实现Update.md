[DOC][7]TodoList接口实现Update
==============================

## (TODO)要做什么
1. 使用`Promise`对异步接口进行封装
2. 使用`Node.js`实现`Update`接口

## (HOWTO)如何做

### 使用`Promis`对`mysql`的异步调用做封装

1. 在`controller/mysql`中增加update的Promise封装

  ```javascript
  controller.update = function(query, params) {
    var deferred = Q.defer();
    connection.query(query, params, function(err, rows, fields) {
      if (err) deferred.reject(err);
      else deferred.resolve(rows);
    });

    return deferred.promise;
  };
  ```

2. 在`route/todo`中实现update接口

  ```javascript
  /**
   * @description 从todolist中删除指定id的数据
   * @param {Request} req 请求对象
   * @param {Response} res 返回对象
   * @return {Response} 返回对象
   *
   */
  router.update('/:id', function (req, res) {
	var id = req.param('id');
    var params = {
		username : req.param('username'),
		content : req.param('content'),
		level : req.param('level'),
    }

    mysql.update('UPDATE list set ? WHERE id = ?', [params, id])
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

3. grunt, 模拟`update`进行读取操作
