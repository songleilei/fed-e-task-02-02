# fed-e-task-02-02

模块化开发与规范化标准

#### 一、简答题

**1. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。**

##### 构建流程主要环节

- 准备阶段

  启动构建，读取与合并配置参数，加载 plugin，实例化 compiler

- 编译阶段

  从 entry 开始递归的分析依赖，对每个依赖模块执行 build。针对每个 module 调用对应的 loader 编译，生成 ast 树。遍历 ast，当遇到 require 等一些调用表达式时，收集依赖.

- 输出阶段

  所有依赖 build 完成，开始优化。输出到指定目录

##### 打包的整个过程

- webpack 配置处理

  ​ 错误检查，增加默认配置等

- 编译前的准备工作

  ​ 处理 webpack 配置中的 plugin，初始化 compiler 等

- 开始编译主入口

- resolve 阶段：解析文件路径&loaders

  解析文件绝对路径

- loaders 逐个执行

- parse 阶段

  ​ 文件转为 ast 树，解析出 import 和 export 等

- 递归处理依赖

- module 优化等

- 生成 chunk

- 生成文件

  ​ 根据模板生成文件名称

- 写文件，结束

**2. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。**

Loader 本质是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。因为 webpack 只认识 JavaScript，所以 loader 就成了翻译官，对其他类型的资源进行转译的处理工作。

Plugin 就是插件，基于事件流 Tapable，可以扩展 webpack 的功能。webpack 生命周期中会广播许多事件，Plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 api 改变输出结果.

```javascript
// Loader 对资源进行转换
module.exports = (source) => {
  const html = marked(source);
  return `module.exports = ${JSON.stringify(html)}`;
  // return `export default ${JSON.stringify(html)}`;
};
```

```javascript
// Plugin 监听事件
class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      for (const key in compilation.assets) {
        if (key.endsWith(".js")) {
          const contents = compilation.assets[key].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, "");
          compilation.assets[key] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}
```

#### 二、编程题

1. 使用 webpack 实现 Vue 项目打包任务

   具体任务及说明：https://github.com/lagoufed/fed-e-001/raw/master/tasks/02-02-base-code.zip

   直接使用 webpack 以及周边工具、Loader、Plugin 还原这个项目的打包任务
