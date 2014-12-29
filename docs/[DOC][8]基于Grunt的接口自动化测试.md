[DOC][8]基于Grunt的接口自动化测试
=============================

## (TODO)要做什么
1. 通过`grunt`使用`mocha`对接口进行测试
2. 对接口层每个接口都进行测试

## (HOWTO)如何做

###安装依赖环境

+ **mocha** 采用`mocha`作为代码的测试框架，关于`mocha`的内容可以参考[这里](http://mochajs.org/)，这个一个短小优雅的测试框架库，可以用来测试客户端和服务端的`js`
+ **chai** 断言库，`mocha`本身没有断言，所以一般都推荐使用`chai`作为配套的断言库，具体的内容看[这里](http://chaijs.com/)
+ **grunt-mocha-test** 支持`mocha`的`grunt module`，参考[文档](https://github.com/pghalliday/grunt-mocha-test)
+ **supertest** 支持`express`的测试工具，参考[文档](https://github.com/tj/supertest)

所以我们需要安装如下的内容

```
npm install grunt-mocha-test --save
npm install chai --save
npm install supertest --save
```

安装内容已经设置在`package.json`中了，直接运行

```
npm install
```

###书写测试用例

+ 建立`test`目录，在`test`目录下建立`spec`目录，在`spec`中建立第一个测试用例`test.api.js`
+ 为`create`接口创建测试用例

```javascript
// 代码库的引用，框架引用
var request = require('supertest');
var app = require('../../app');
var chai = require('chai');


// 声明使用expect作为断言
var expect = chai.expect;

// mocha开始申明第一个TC
describe('RESTFUL接口测试 -- create接口', function () {

  // 描述测试内容
  it('创建todo内容', function (done) {

    // 使用supertest进行测试
    request(app)
      .post('/todo/')
      .send({'username': 'peter', 'content': 'rose', 'level': 'high'})
      .expect(200)
      .end(function (err, res) {
          if (err) throw done(err);

          var data = JSON.parse(res.text);

          // 设置简单的断言内容
          expect(data.id).to.be.a('number');
          done();
        })
  })
});
```

+  建立grunt任务

在`Gruntfile.js`添加`mochaTest`的配置

```javascript
mochaTest: {
  test: {
    options: {
      report: 'spec',
      clearRequireCache: false
    },
    src: ['test/**/*.js']
  }
}
```

注册一个`task`运行`mochaTest`

```javascript
grunt.registerTask('test', [
  'mochaTest'
]);
```

--------
OK 好了大功告成，运行一下`grunt test`看看有什么结果！！

###Travis
`github`提供了一个`ci`的工具叫做`travis`，具体访问[https://travis-ci.org/](https://travis-ci.org/)

我在项目里面建立了`.travis.yml`可以在`travis.org`里面直接跑测试，玩玩看吧