SPA(单页应用)
=============

SPA(Single Page Application)，单页应用，即将网站或应用的不同视图与内容都放在同一个页面内进行逻辑处理并展现的方案，使得传统内容间的切换可以无须通过页面的跳转，从而使网站或在线应用得到更快速的、类似桌面应用的用户体验。

SPA前：所有视图跳转需要进行页面重定向，重新加载所有静态资源
SPA后：视图跳转通过js进行视图更新，无须重新加载资源/只加载必要资源，页面URL通过hash或是History API的pushState进行更新

## 需要解决的问题： 

1. 视图渲染与数据绑定： 页面将从传统的整个页面的传输变为只加载部分HTML片段或JSON数据，将视图与数据进行浏览器内的数据绑定。（pjax, jQuery等）
2. 控制逻辑：传统的一次性的DOM逻辑处理将变为更精密的结构，通常变为由控制器（Controller）将视图（View）与模型(Model)分离的 MVC 或 MVVM 模式。（Backbone, Emberjs, Angular 等）
3. 路由：所选择的视图与导航在不刷新页面时能保留页面状态、节点与数据。（History.js, director, pjax, HTML5 History API等）

而在移动端，需要更小量级的代码量以获取更快的加载速度，所以在框架选型上，推荐 zepto.js 配合 Backbone.js 或 pjax 的方案，能得到更轻量的体验。
