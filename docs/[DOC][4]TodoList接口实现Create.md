[DOC][4]TodoList接口实现Create
=============================

## (TODO)要做什么
1. 使用`NodeJS`实现`Create`接口
2. 使用`Promise`对异步接口进行封装
3. 做`TodoList`实例

## (HOWTO)如何做

###建立`TodoList`数据库

1. 在`mysql`的数据库中建立名字为`todo`的`Database`
2. 在`todo`数据库中建立`list`作为`table`，设置4个`col`: id(int), username(text), content(text), level(text)
3. 在数据库中插入一些数据

###使用`Promise`对`mysql`的异步调用做封装

1. 建立`controller`目录，并且在目录下建立`mysql.js`文件
2. 在`mysql.js`中引入类库: `q`和`node-mysql`，这个文件用来做`mysql`的封装

  ```javascript
  var Q          = require('q');
  var mysql      = require('mysql');

  ```

3. 使用闭包对连接做存储，同时完成对`connect`的封装


  ```javascript
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
  ```

  `connect`在`app.js`中使用，建立`connection`对象之后被闭包保存，其他地方调用的时候`connection`已经存在

4. 对`mysql`的异步过程做封装

  ```javascript
  controller.create = function (query, params) {
    var deferred = Q.defer()
    connection.query(query, params, function(err, rows, fields) {
      if (err) deferred.reject(err);
      else deferred.resolve(rows)
    });

    return deferred.promise;
  };
  ```

  这里不详细说了，完全和[在Node.js 中用 Q 实现Promise – Callbacks之外的另一种选择](http://www.ituring.com.cn/article/54547)举出的例子一样

5. 建立`todo`的路由文件

  在`routes`目录下建立文件`todo.js`，引用封装好的`mysql.js`

  ```javascript
  var mysql = require('../controller/mysql');
  ```

  对`post`方法建立业务逻辑

  ```javascript
  /**
   * @description 向todolist添加数据
   * @param {Request} req 请求对象
   * @param {Response} res 返回对象
   * @return {Response} 返回对象
   */
  router.post('/', function (req, res) {

    // 通过req获取请求参数
    var params = {
      username: req.param('username'),
      content: req.param('content'),
      level: req.param('level')
    }

    // 调用mysql的create方法设置参数
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
  ```

6. 在`app.js`中引用`todo.js`并且设置到`localhost:3000\todo\`目录下

7. 运行`supervisor bin/www`，模拟`post`接口和参数访问`localhost:3000\todo\`，关于具体代码参考项目