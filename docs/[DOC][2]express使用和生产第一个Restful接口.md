[DOC][2]express使用和生产第一个Restful接口
=======================================

## (TODO)要做什么
1. 了解Express的结构
2. 使用Route构建第一组Restful接口
3. 使用Grunt进行调试

## (HOWTO)如何做
### 了解Express

`Express`是一款轻量级的NodeJS服务端框架类似与`Python`中的`web.py`，它专注于快速的搭建一套可以运行的可扩展的NodeJS服务端的框架。

从目录结构上来看，简单的`Express`结构分成
```
 -bin
 -public
 -routes
 -views
```

`bin`目录下的`www`是服务端程序运行的驱动器
```javascript
#!/usr/bin/env node
var debug = require('debug')('expressapp');
var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
```
代码比较清晰，它设置了服务启动的接口3000，设置了`debug`模式，这些是对`app`的运行模式做配置。做正式上线�前这里的陪你需要重新进行配置，比如设置Log文件等。一般在使用中常常将NodeJS挂在Ngnix的一个端口下面，让Ngnix去处理IO，做Buffer，NodeJS本身处理IO流还是有很多的问题。

`public`相当于`static`目录服务端的静态资源，都是放在`public`目录中的

`routes`是比较核型的内容，它可以设置具体端口的业务代码
以`index.js`为例
```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```
这里它引用了一个express.Route()对象，这是一个单例的对象，用来定义具体接口。

`router.get`方法定义了接口使用`get`方法进行访问，第一个参数`'/'`定义了接口访问地址，第二个参数是具体的访问回调代码，即用户以`get`方式访问了`'/'`接口之后，运行回调代码返回内容给用户，这里回调中的`render`方法实际上就是调用了`jade`模版进行渲染，产出具体的页面返回给用户。

`views`目录显示的是需要渲染的`jade`模版文件或者其他的模版文件

在根目录中`app.js`是核心的代码，看一下其中几段需要重点关注的代码
```
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
```
这段代码配置了`view`的渲染引擎是`jade`，并且配置了模版的目录是`views`

```
app.use(express.static(path.join(__dirname, 'public')));
```
这段代码配置了`public`是静态文件目录

```
app.use('/', routes);
app.use('/users', users);
```
这段代码，配置了具体`route`在那个访问子目录下进行工作

###使用Route构建demo

在routes目录中创建`demo.js`文件
仿照`route/index.js`代码写一个`example`例子
```javascript
var express = require('express');
var router = express.Router();

router.get('/example', function (req, res) {
  // 这里我们把渲染的title变化了
  res.render('index', { title: 'Demo Example' })
});

module.exports = router;
```

修改根目录中`app.js`文件修改`route`的配置
```
app.use('/', routes);
app.use('/users', users);
// 添加demo子目录
app.use('/demo', demo);
```

运行`grunt`命令，然后访问`localhost:3000/demo/`就看到了`Demo Example`的字样了

###使用Route构建一组Restful接口

我们继续在`demo.js`文件中进行工作，在`Restful`的定义中可以，使用多种`method`进行访问，根据`expressjs`的[文档](http://expressjs.jser.us/3x_zh-cn/api.html#app.routes)，可以通过map的方式进行访问，所以首先定义4个不同`method`的接口

```javascript
router.get('/:id', function (req, res) {
  // body...
});

router.delete('/:id', function (req, res) {
  // body...
});

router.post('/:id', function (req, res) {
  // body...
});

router.put('/:id', function (req, res) {
  // body...
});
```
代码里`:id`是`Express`接受参数的方法，我们分别为他们的返回值添加不同的内容

```javascript
router.get('/:id', function (req, res) {
  res.json({name: 'get:'+req.params.id});
});

router.delete('/:id', function (req, res) {
  res.json({name: 'delete:'+req.params.id});
});

router.post('/:id', function (req, res) {
  res.json({name: 'post:'+req.params.id});
});

router.put('/:id', function (req, res) {
  res.json({name: 'put:'+req.params.id});
});
```

用`grunt`启动一下，使用不同的`method`来访问吧

Tip：推荐使用`Chrome`进行调试，关于接口调试的`Chrome`可以点[这里](https://chrome.google.com/webstore/detail/dhc-resthttp-api-client/aejoelaoggembcahagimdiliamlcdmfm?utm_source=chrome-ntp-icon)

###使用Grunt进行调试
如果你用`node bin/www`进行启动，会存在两个问题

1. 如果程序挂掉了，没有守护进程重启程序
2. 开发中如果文件被修改了需要杀掉再重启

[node-supervisor](https://github.com/isaacs/node-supervisor)提供了这种功能，在站点上可以考虑使用`node-supervisor`作为守护进程

`Yeoman`已经为`grunt`配置了一系列的脚本，所以在调试过程中，会有很多的调试信息反馈出来，这点非常重要，提高了调试的效率

##参考
1. [node-supervisor](https://github.com/isaacs/node-supervisor)
2. [使用supervisor提高nodejs调试效率](http://www.cnblogs.com/pigtail/archive/2013/01/08/2851056.html)
3. [ExpressJS](http://expressjs.com/)
4. [ExpressJS-jSer](http://expressjs.jser.us/)