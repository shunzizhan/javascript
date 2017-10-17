#javascript 学习笔记
### http
#### 状态码
- 详细对照表：http://tool.oschina.net/commons?type=5
- 1xx:信息类，表示收到web浏览器请求，正在进一步的处理中
- 2xx:成功，表示用户请求被正确接收
- 3xx:重定向，表示请求没有成功，客户必须采取进一步的动作
- 4xx:客户端错误，表示客户端提交得请求有错误
- 5xx：服务器错误，表示服务器不能完成对请求的处理

#### XMLHttpRequest
- responseText:目前为止从服务器接收到的响应体（不包括头部），或者如果还没有接收到数据的话，就是空字符串
- responseXML:对请求的响应，解析为 XML 并作为 Document 对象返回。如果响应体不是text/xml返回null。
- status:由服务器返回的 HTTP 状态代码，如 200 表示成功，而 404 表示Not Found错误。当 readyState 小于 3 的时候读取这一属性会导致一个异常。
- statusText:这个属性用名称而不是数字指定了请求的 HTTP 的状态代码。也就是说，当状态为 200 的时候它是 OK，当状态为 404 的时候它是Not Found。和 status 属性一样，当 readyState 小于 3 的时候读取这一属性会导致一个异常。
- readyState:HTTP 请求的状态.当一个 XMLHttpRequest 初次创建时，这个属性的值从 0 开始，直到接收到完整的 HTTP 响应，这个值增加到 4
	- 0: 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置
	- 1:open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
	- 2：Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
	- 3：所有响应头部都已经接收到。响应体开始接收但未完成。
	- 4：HTTP 响应已经完全接收。

#### 栗子
**get**
```html
	var request = new XMLHttpRequest();
	request.open("GET", "server.php?number=" + document.getElementById("keyword").value);
	request.send();
	request.onreadystatechange = function() {
		if (request.readyState===4) {
			if (request.status===200) { 
				document.getElementById("searchResult").innerHTML = request.responseText;
			} else {
				alert("发生错误：" + request.status);
			}
		} 
	}
```

**post** setRequestHeader必须得加，否则会出现请求失败
```html
	var request = new XMLHttpRequest();
	request.open("POST", "server.php");
	var data = "name=" + document.getElementById("staffName").value 
	                  + "&number=" + document.getElementById("staffNumber").value 
	                  + "&sex=" + document.getElementById("staffSex").value 
	                  + "&job=" + document.getElementById("staffJob").value;
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(data);
	request.onreadystatechange = function() {
		if (request.readyState===4) {
			if (request.status===200) { 
				document.getElementById("createResult").innerHTML = request.responseText;
			} else {
				alert("发生错误：" + request.status);
			}
		} 
	}
```
### json
**在线工具**： https://jsonlint.com/

#### eval
- 解析字符串时能同时解析字符串中的脚本，并执行脚本，因此`在不确定字符串安全`的情况下，不能使用，避免恶意脚本对网站进行攻击

#### JSON.parse
- 解析规范的json类型字符串

#### JSON.stringify
- 将json数据解析成字符串

#### 栗子
```html
<script>
	var obj = '{"data":[{"name":"张三","age":30},{"name":"李四","age":27}]}';
	var t1 = eval('(' + obj + ')');
	alert(t1.data[0].age); // 30
	var t2 = JSON.parse(obj);
	alert(t2.data[0].age); // 30

	var obj1 = '{"data":[{"name":"张三","age":alert(123)},{"name":"李四","age":27}]}';
	var t3 = eval('(' + obj1 + ')');
	alert(t3.data[0].age); // 123 undefind
	var t4 = JSON.parse(obj1);
	alert(t4.data[0].age); // Unexpected token a in JSON at position 28

  var arr = [{"name":"张三","age":32},{"name":"李四","age":27}];
  var t5 = JSON.stringify(arr);
  alert(t5); // "[{"name":"张三","age":32},{"name":"李四","age":27}]"
	</script>
```