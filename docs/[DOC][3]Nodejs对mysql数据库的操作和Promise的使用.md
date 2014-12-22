[DOC][3]Nodejs对mysql数据库的操作和Promise的使用
=============================================

## (TODO)要做什么
1. 使用MySQL建立数据库，并用Nodejs进行连接和访问
2. 调用MySQL接口
3. 使用Promise进行串性调用

## (HOWTO)如何做
### 创建MySQL数据库

创建MySQL数据库的工作不在这里说了，说说怎么用NodeJS对MySQL进行调用

通过NodeJS调用MySQL数据库，推荐使用[node-mysql](https://github.com/felixge/node-mysql)，通过`NPM`进行安装

```shell
# 在项目根目录下执行
npm install node-mysql --save
```

`--save`会在`package.json`中添加一条对`node-mysql`的引用纪录，下次用`npm install`的时候会自动读取这个文件进行依赖库的安装

关于创建`mysql`数据库的工作，不在本文的说明里面。

### 在NodeJS中调用MySQL数据库

使用了`node-mysql`对`mysql`的请求一目了然

```
// 引用 node-mysql
var mysql      = require('mysql');

// 设定mysql的连接参数
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret'
});

// 发起连接
connection.connect();

// 查询数据库中的数据
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

// 结束连接
connection.end();
```

关于更多的使用细节，参考[文档](https://github.com/felixge/node-mysql)

### 使用Promise

在`NodeJS`中推荐使用的`Promise`实现是[Q](https://github.com/kriskowal/q)

关于`Promise`的内容原来想好好写写，然后阅读了[这篇文章](http://www.ituring.com.cn/article/54547)，发现就不用写了，它写的真好。

在`docs`文件夹下同时也写了一篇`[DOC][Extra]Promise.md`会逐步写的更好