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

> The core idea behind promises is that a promise represents the result of an asynchronous operation. A promise is in one of three different states:
> + pending - The initial state of a promise.
> + fulfilled - The state of a promise representing a successful operation.
> + rejected - The state of a promise representing a failed operation.

##参考
+ [https://www.promisejs.org/](https://www.promisejs.org/)
+ [http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/](http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/)
+ [https://github.com/kriskowal/q](https://github.com/kriskowal/q)
+ [https://github.com/kriszyp/node-promise](https://github.com/kriszyp/node-promise)
+ [http://www.ituring.com.cn/article/54547](http://www.ituring.com.cn/article/54547)