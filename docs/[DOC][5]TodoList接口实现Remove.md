[DOC][5]TodoList接口实现Remove
==============================

## (TODO)要做什么
1. 使用`Promise`对异步接口进行封装
2. 使用`Node.js`实现`Remove`接口

## (HOWTO)如何做

### 使用`Promis`对`mysql`的异步调用做封装

1. 在`controller/mysql`中增加delete的Promise封装

  ```javascript
  controller.delete = function(query, params) {
    var deferred = Q.defer();
    connection.query(query, params, function(err, rows, fields) {
      if (err) deferred.reject(err);
      else deferred.resolve(rows);
    });

    return deferred.promise;
  };
  ```

2. 在`route/todo`中实现delete接口

  ```javascript
  /**
   * @description 从todolist中删除指定id的数据
   * @param {Request} req 请求对象
   * @param {Response} res 返回对象
   * @return {Response} 返回对象
   *
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

3. grunt, 模拟`delete`进行删除操作
