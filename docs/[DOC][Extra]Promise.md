Promise
========

##Pyramid of Doom
`Pyramid of Doom`这个词不知道怎么翻译，只好用知道的一个词来代替它，那么就是`回调陷阱`

对于`javascript`的`回调陷阱`，其实大部分人都有遇到，不管在`nodejs`里还是在`jquery`中以`nodejs`中一个读写数据库为例

```javascript
var db = require('./db/callbackDb');

db.set('key1', 'value1', function(err) {
  if(err) throw err;

  db.set('key2', 'value2', function(err) {
    if(err) throw err;

    db.set('key3', 'value3', function(err) {
      if(err) throw err;

      var str = '';
      db.get('key1', function(err, value) {
        if(err) throw err;
        str += value + ' - ';
        console.log(str);
      });
    });
  });
});
```
本案例[来自](http://survivejs.com/common_problems/pyramid.html)

这种调用的问题在哪里？

1. 代码阅读非常困难
2. 同名变量太多且嵌套
3. 无止境...

##Promise

> promise是对异步编程的一种抽象。它是一个代理对象，代表一个必须进行异步处理的函数返回的值或抛出的异常。

callback是编写Javascript异步代码最最最简单的机制。可用这种原始的callback必须以牺牲控制流、异常处理和函数语义为代价，而我们在同步代码中已经习惯了它们的存在，不适应！Promises能带它们回来。

一般我们认为一个异步过程有3种状态，`pending`|`success`|`fail`，`Promise`就是将这些状态抽象成方法，`pending`过程是第一步的执行过程，其返回值带有`success`和`fail`两个方法的对象。

举例来说
```
$.when($.ajax(setting))
  .done(function())
  .fail(function());
```
`when`其实可以看作是中间态，`done`和`fail`是执行的返回对象带有的方法

##参考
+ [https://www.promisejs.org/](https://www.promisejs.org/)
+ [http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/](http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/)
+ [https://github.com/kriskowal/q](https://github.com/kriskowal/q)
+ [https://github.com/kriszyp/node-promise](https://github.com/kriszyp/node-promise)
+ [http://www.ituring.com.cn/article/54547](http://www.ituring.com.cn/article/54547)