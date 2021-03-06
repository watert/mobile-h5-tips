Web/JS测试框架推荐
=============

在计算机编程中，单元测试（又称为模块测试, Unit Testing）是针对程序模块（软件设计的最小单位）来进行正确性检验的测试工作。
程序单元是应用的最小可测试部件。在过程化编程中，一个单元就是单个程序、函数、过程等；
对于面向对象编程，最小单元就是方法，包括基类（超类）、抽象类、或者派生类（子类）中的方法。

每个理想的测试案例独立于其它案例；为测试时隔离模块，经常使用stubs、mock或fake等测试马甲程序。
单元测试通常由软件开发人员编写，用于确保他们所写的代码符合软件需求和遵循开发目标。
它的实施方式可以是非常手动的（通过纸笔），或者是做成构建自动化的一部分。

目标：单元测试的目标是隔离程序部件并证明这些单个部件是正确的。
一个单元测试提供了代码片断需要满足的严密的书面规约。
因此，单元测试带来了一些益处。 单元测试在软件开发过程的早期就能发现问题。

单元测试的框架推荐使用Jasmine或Mochajs，他们都有着完善的文档与成熟的社区支持。本文中将以Mochajs为例。

## 安装

首先我们需要安装Mochajs与Chai（Chai是一个BDD/TDD的断言库，Mocha没有内建的相关支持，所以通常一起使用）

1. 此处假设已经准备好了node与npm环境，具体安装方式查看[Nodejs官网](https://nodejs.org/)
2. 全局安装mocha `$ npm install -g mocha`
3. 初始化mocha目录 `$ mocha init test/`
4. 安装chai `$ npm install chai --save-dev`
5. 在生成的 `test/` 目录下添加chai
    - 浏览器方式：编辑 `test/index.html`, 在 `mocha.js` 的script标签后添加chai.js:
        ```html
        <script src="../node_modules/chai/chai.js"></script>
        ```

        注意node_modules的具体所在目录，应是能静态访问的目录，有必要的话将该文件拷备出来

    - 终端运行方式：编辑 `test/tests.js`， 在开头添加
        ```javascript
        if(typeof require!="undefined" && !require.amd){
            var chai = require("chai");
        }
        ```


## 开始测试

以上的安装完成后，我们就可以在 `test/tests.js` 中添加测试案例


### 从一个失败的单元开始

在tests.js中添加如下代码:

```javascript
var assert = chai.assert;
describe("start testing", function(){
    it("should assert fail", function(){
        assert.equal(1+1 , 3, "check plus wrong");
    });
});
```

访问`[your base url]/test/`路径，就将会执行测试。

显然，1+1不等于3，于是访问test页面会返回以下错误信息:

![plus wrong](images/testing-1.png)

同时，也可以在终端中直接测试：

```bash
$ mocha tests.js
```
将返回如下结果：

![plus wrong terminal](images/testing-2.png)

而当我们将测试的值修改为正确的时候，测试就将通过了：

```javascript
assert.equal(1+1 , 2, "check plus wrong");
```

终端运行结果为：

![plus right](images/testing-3.png)


### 测试的前置与后置

Mocha提供了 `before`, `beforeEach`, `after`, `afterEach` 四个实用的方法，
能在测试单元执行前进行设置，或是在执行后进行销毁。比如添加下面的代码：

```javascript
describe("start testing", function(){
    var a,b;
    before(function(){
        a = 10; b = 20;
    });
    beforeEach(function(){
        b+=1;
    });
    it("should a and b value", function(){
        assert.equal(a, 10, "check a value");
        assert.equal(b, 21, "check b value plus 1st time");
    });
    it("should b value again", function(){
        assert.equal(b, 22, "check b value plus 2nd time");
    });
});
```

![plus right](images/testing-4.png)

可以看到，上面的代码全部都会通过。而 `after` 与 `afterEach` 则常用于数据的销毁或重置。

### 异步请求的测试

众所周知 Javascript 中有大量的异步请求，对于这种情况，mocha提供了 `done` 参数传入的功能，
也提供传入 Promise 进行异步的方法：

```javascript
describe("async testing", function(){
    it("should async using `done` method", function(done){
        setTimeout(function(){
            assert.equal(1+1,2,"check after .5s");
            done();
        }, 500);
    });
    it("should async using Promise",function(){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                assert.equal(1+1,2,"check after .5s");
                resolve(true);
            },500);
        });
    });
    it("should fail with Promise",function(){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                reject("failure");
            },500);
        });
    });
});
```

![plus right](images/testing-5.png)

可以看到，两种方式都能正常地执行500ms后的操作，而且执行时长也会在输出中说明（适于定位各类操作的耗时），
而失败时也会将promise抛出的reject进行说明，这在进行某些ajax操作时尤其实用。

这些测试也都可以在浏览器中直接使用，返回的结果是一致的：

![plus right](images/testing-6.png)

## 一些实用的方法

### 1. 终端中的watch

在终端中使用时，使用 `--watch` (或缩写为`-w`) 参数即可监测代码的改动随时重新执行测试。这对于代码逻辑的调试阶段尤其实用。

```bash
$ mocha tests.js --watch
```

### 2. 查看当前关注的测试组

Mocha提供了grep方法，可以进行测试describe组的筛选。

在浏览器中可以点击相应的组名，则会自动地进行相应操作，grep的参数值会在url中有所体现。

![plus right](images/testing-7.png)

而在命令行中则需要自己输入，Grep的参数基于字符串：

```bash
mocha tests.js --grep="async testing"
```

返回结果：

![plus right](images/testing-8.png)

## 更多信息

* 关于mochajs的更多信息可以查看[mochajs的文档](https://mochajs.org/)
* 关于chai的用法参阅[chai的API文档](http://chaijs.com/api/)
* 希望在终端中模拟浏览器中的行为可以使用[mocha-phantomjs](https://github.com/nathanboktae/mocha-phantomjs)

[@watert](https://github.com/watert/)
