[DOC][1]设置和初始化项目
=======================

## (TODO)要做什么
1. 使用`yeoman`工具生成`express`项目
2. 使用`express`构建`nodejs`的`RESTFUL`服务
3. 使用`nodejs`连接`MYSQL`数据库进行读写
4. 使用`grunt`做项目的自动化构建，并且用`travis`做项目的CI

说明：
+ `grunt`是`nodejs`的项目构建工具，关于`grunt`的内容参考[http://gruntjs.com/](http://gruntjs.com/)
+ `yeoman`是Google在构建`AngularJS`项目时开发的一套项目WorkFlow的工具，具体内容参考[http://yeoman.io/](http://yeoman.io/)
+ `express`是现在最流行的`nodejs`服务端开发框架

## (HOWTO)如何做
### 使用`yeoman`初次生成项目

+ 安装`nodejs`: 在`nodejs`的站点上下载并进行安装[http://nodejs.org/](http://nodejs.org/)
+ 在`nodejs`的环境中安装`grunt-cli`
    ```
    npm install -g grunt-cli
    ```
+ 安装`bower`包管理工具
    ```
    npm install -g bower
    ```
+ 在`nodejs`中安装`yeoman`和`yeoman express`的生成器
    ```
    npm install -g yo
    npm install -g generator-express
    ```
+ 安装完毕之后，开始初始化项目
    ```
    yo express
    ```
    在安装的过程中会问一系列的问题，在本期中做如下处理
    > ? Select a version to install: Basic

    > ? Select a view engine to use: Jade

    > ? Select a css preprocessor to use (Sass Requires Ruby): None

    > ? Select a build tool to use: Grunt
+ 完成项目初始化之后使用`grunt`，然后访问`localhost:3000`看到`express`就对了

### 对已经生成的项目使用构建工具
在`clone`项目之后进行项目构建

+ 安装`nodejs`: 在`nodejs`的站点上下载并进行安装[http://nodejs.org/](http://nodejs.org/)
+ 在`nodejs`的环境中安装`grunt-cli`
    ```
    npm install -g grunt-cli
    ```
+ 安装`bower`包管理工具
    ```
    npm install -g bower
    ```
+ 在`nodejs`中安装`yeoman`和`yeoman express`的生成器
    ```
    npm install -g yo
    npm install -g generator-express
    ```
＋ 进入项目目录，安装开发依赖包
    ```
    npm install
    bower install
    ```
+ 完成项目初始化之后使用`grunt`，然后访问`localhost:3000`看到`express`就对了