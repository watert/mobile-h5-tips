HTML5实用功能推荐
=============

### 一、HTML5实用功能之Application Cache
#### 1、Application Cache的优点和应用场景
**优点**
- 离线浏览 – 用户可在离线时浏览您的完整网站
- 速度 – 缓存资源为本地资源，因此加载速度较快。
- 服务器负载更少 – 浏览器只会从发生了更改的服务器下载资源。

**应用场景**
- 完整的离线应用，可以缓存一些商户要展示给用户的重要资源信息。
- H5页面小游戏，当网络不稳定或者断网的情况下也可以继续进行。
- 网站一些长期不变的公共资源，可以放缓存。
- 其他。

#### 2、Application Cache的运行流程和文件规范
**运行流程**

图片
   
**文件规范**

    CACHE MANIFEST
    # Javascript v9.6
    CACHE:
    	cache.css
    	cache.js
    	jquery-2.1.4.min.js
    	test1.png
    	test2.png
    NETWORK:
    	
    FALLBACK: 
第一行CACHE MANIFEST必须写，第二行通常为版本号注释信息，用来更新manifest文件，下面分别为要缓存的文件，需要通过网络获取的文件，以及从网络请求失败的替代页面。（**本文重点讲述application cache使用时的注意点以及作者在测中踩过的坑，基本使用不作重点讲述。**）

#### *3、使用Application Cache的注意点和建议
- 离线缓存文件要更新，一定要同步更新manifest文件（通常是注释版本号）。
- 引用manifest文件的页面也会被缓存。
- 如果manifest文件，或者内部列举的某一个文件不能正常下载，整个更新过程将视为失败，浏览器继续全部使用旧的缓存。
- 页面不能跨域引用manifest文件，但是manifest中可以指定跨域资源进行缓存。
- FALLBACK中的资源必须和manifest文件同源。
- manifest缓存与http本身的缓存功能并不冲突，虽然更新manifest文件后会把manifest清单中的文件都重新去服务器请求一次，但是是基于http请求，此时http本身的缓存机制依然有效。
- 虽然manifest清单中的NETWORK不是必写的，但是经过实测，页面中所需的资源是CACHE和NETWORK以及FALLBACK的并集，如果页面中引用的资源在三者中都没有指定，将不会获取，并不会默认从网络获取。
- 站点中的其他页面即使没有设置manifest属性，请求的资源如果在缓存中也从缓存中访问。
- 引用manifest页面若带参数，参数改变，浏览器会将页面认为是新的使用了application cache功能的页面，从而将该页面进行缓存，并且进行一次manifest的检查和拉取。
- manifest的缓存加载和页面加载是异步的，所以manifest有更新时，需要刷新两次用户端才能实现更新。解决方法可以写一段脚本，判断当applicationcache状态为updateready时（此状态表示缓存资源更新了），提示用户更新页面，或者强制刷新。（示例如下）
图片

### 二、HTML5实用功能之运动度传感器事件devicemotion和方向传感器事件deviceorientation
#### 1、H5 devicemotion和deviceorientation基本介绍和应用背景。
**基本介绍**
- *devicemotion*：封装了加速度传感器数据的事件。网页可以通过该事件获取到设备的加速度传数据。
- *deviceorientation*：封装了方向传感器数据的事件。网页可以通过该事件获取到设备的方向信息。

**应用场景**

可以基于以上一个或者两个，来获得硬件设备的运动情况，从而进行一些处理或者开发一些趣味应用，类似：
- 手机摇一摇（基于摇一摇的活动，例如摇一摇红包）。
- 手机平衡球游戏等。
- 体感游戏。
- 等等。

#### 2、H5 devicemotion 和deviceorientation API使用方法。
*devicemotion</b>*：
图片


*deviceorientation</b>*：
图片

#### 3、手机H5页面红包摇一摇Demo
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<meta charset="UTF-8">
    	<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    	<script src="jquery-2.1.4.min.js"></script>
    	<link href="red.css" rel="stylesheet">
    	<title>red</title>
    	<style>
    
    	</style>
    </head>
    <body onload="initMotion()">
    <div id="page1">
    	<div id="red-wrap">
    		<div id="circle">
    			<span>Lucky Money</span>
    		</div>
    	</div>	
    
    	<btn id="rules" class="btn" onclick="rulesToggle()">Rules</btn>
    	<btn id="tryAgain" class="btn" onclick="tryAgain()">Try Again</btn>
    </div>
    <div id="page2">
    	<div id="rules-wrap">
    		<h2 id="Rules">Rules</h2>
    		<ul>
    			<li>Shake your phone,and you will get lucy money of random amount.</li><br/>
    			<li>Click "Get My Luck",and the money will be deposited into your account.</li><br/>
    			<li>Share your luck to your friends via sharing game this to your friends.</li>		
    		</ul>
    	</div>
    </div>
    	
    	
    	
    <script>
    	SHAKE_THRESHOLD = 3000;
    	var last_update = 0;
    	var x = y = z = last_x = last_y = last_z = 0;
    	var shakeFlag = 1;
    	function initMotion(){
    		if (window.DeviceMotionEvent) {
    			if(shakeFlag){
    				window.addEventListener('devicemotion', deviceMotionHandler, false); 
    			}         		 
    	    }else{
    	    	alert("not support!");
    	    }  
    	}
    	
        function deviceMotionHandler(eventData) {  
    	    var acceleration = eventData.acceleration;  
    	    var currTime = new Date().getTime();  
    	    var diffTime = currTime - last_update;  
    	    if (diffTime > 120 && shakeFlag == 1) {  
    	        last_update = currTime;  
    	        x = acceleration.x;  
    	        y = acceleration.y;  
    	        z = acceleration.z;  
    	        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 30000;  
    
    	        if (speed > SHAKE_THRESHOLD) {  
    	            //要一摇之后进行业务逻辑处理              
    	            shaking();                        
    	           setTimeout(function(){$.get("red.php",function(data){
    	            	$("#circle span").css("font-size","30px").html(data+" "+"$");
    	            })},1000);
    	            
    	            shakeFlag = 0;
    	        }           
    	        last_x = x;  
    	        last_y = y;  
    	        last_z = z;  
    		}
        } 
    
        function tryAgain(){
        	shakeFlag = 1;
        	$("#circle span").html("Lucky Money");
        	$("#red-wrap").removeClass("shaking");
        	$("#circle span").css("font-size","20px");
        	$("#circle").css("background","yellow");
        } 
    
        function rulesToggle(){
        	if(!$("#page2").height()){
        		$("#page2").css({"height":"68%","opacity":1});
        	}else{
        		$("#page2").css({"height":0,"opacity":0});
        	}   	
        }
        function shaking(){
        	$("#red-wrap").addClass("shaking");
        }
    
        function getRandomColor(){ 
    		return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
    	}
    	function colorChange(){
    		$("#circle").css("background",getRandomColor());
    		setInterval("colorChange()",200);
    	}
    </script>
    	
    </body>
    </html>
[arthur](https://github.com/arluo) / [bryan](https://github.com/saviroyu)
