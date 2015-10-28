#CSS3新功能推荐及优化	
=============
## transtion
CSS 过渡（transition）, 是 CSS3 规范的一部分,可以让属性的变化过程持续一段时间，而不是立即生效，将按一个曲线速率变化，这个过程是可以自定义。比如，将元素的高度从0%变为100%，将元素的颜色由白色变为黑色等。
通常将两个状态之间的过渡称为隐式过渡 implicit transitions ，因为开始与结束之间的状态由浏览器自行决定。
过渡可以决定哪些属性发生动画效果 (明确地列出这些属性)，何时开始 (设置 delay), 持续多久 (设置 duration) 以及如何动画 (定义timing函数，比如匀速地或先快后慢)。
### 语法：

### 使用注意：
 - 目前，各大浏览器（包括IE 10）都已经支持无前缀的transition，不过鉴于标准刚刚稳定，对于基于 Webkit的浏览器仍然需要厂商前缀。兼容性表格如下：

![plus right](images/css3-1.png)

 - 不是所有的CSS属性都支持transition，完整的列表查看![这里](http://oli.jp/2010/css-animatable-properties/)，以及具体的效果。
 - transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。
### 局限

## border-radius
## box-shadow
## text-outline&text-shadow
## multiple backgrounds
## background-size
## text-overflow
## Flexible Box Model
## 书写顺序
border-radius属性被重写

[@bryan](https://github.com/saviroyu)
