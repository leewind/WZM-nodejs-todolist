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

### 在NodeJS中调用MySQL数据库

### 使用Promise

在`NodeJS`中推荐使用的`Promise`实现是[Q](https://github.com/kriskowal/q)