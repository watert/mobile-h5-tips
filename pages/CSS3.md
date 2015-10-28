#CSS3新功能推荐及优化	
=============
## transtion
CSS 过渡（transition）, 是 CSS3 规范的一部分,可以让属性的变化过程持续一段时间，而不是立即生效，将按一个曲线速率变化，这个过程是可以自定义。比如，将元素的高度从0%变为100%，将元素的颜色由白色变为黑色等。

通常将两个状态之间的过渡称为隐式过渡 implicit transitions ，因为开始与结束之间的状态由浏览器自行决定。

过渡可以决定哪些属性发生动画效果 (明确地列出这些属性)，何时开始 (设置 delay), 持续多久 (设置 duration) 以及如何动画 (定义timing函数，比如匀速地或先快后慢)。

#### 语法：
transition是简写属性，有以下四个属性值：
     ```css
     transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
     ```
#### 使用注意：
 - 目前，各大浏览器（包括IE 10）都已经支持无前缀的transition，不过鉴于标准刚刚稳定，对于基于 Webkit的浏览器仍然需要厂商前缀。兼容性表格如下：

![plus right](images/css3-1.png)

 - 不是所有的CSS属性都支持transition，完整的列表查看[这里](http://oli.jp/2010/css-animatable-properties/)，以及具体的效果。
 - transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。
 - 同时应当留意这种情形，在插入元素（如 .appendChild()）或改变属性 display: none 后立即使用过渡, 元素将视为没有开始状态，始终处于结束状态。简单的解决办法，改变属性前用 window.setTimeout() 延迟几毫秒。

#### 局限
transition的优点在于简单易用，但是它有几个很大的局限。
  - transition需要事件触发，所以没法在网页加载时自动发生。
  - transition是一次性的，不能重复发生，除非一再触发。
  - transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。 CSS Animation可以解决这个问题，能够指定动画多个中间状态。

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
