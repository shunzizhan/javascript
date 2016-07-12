#javascript 学习笔记
## 面向对象

### 创建对象

- 大量的重复代码

#### 工厂模式

- 无需重复创建多个相似的对象
- 无法解决 `对象识别`

#### 构造函数模式

- 没有显式的创建对象
- 直接将属性和方法赋值给了this对象
- 没有return

> 按照惯例，构造函数首字母大写

1.将构造函数当做函数
```javaScript
  function Person(name, age, job){
    this.name= name;
    this.age= age;
    this.job = job;
    this.sayName = function(){
      alert(this.name);
    }
  }
  // 1.将构造函数当做函数
  var person1 = new Person("shunzizhan",24,"web前端工程师");
  person1.sayName();
  
  // 作为普通函数调用
  Person("Mark",26,"sgfsgf");
  window.sayName();

  // 在另一个对象的作用域中调用
  var o = new Object();
  Person.call(o,"shunzizhan",27,"web前端工程师");
  o.sayName();
```

2.构造函数的问题

>  每个方法都要在每个实例上面重新创建一次
>  解决办法：把函数定义转移到函数外部

```javascript
 function Person(name, age, job){
    this.name= name;
    this.age= age;
    this.job = job;
    this.sayName = sayName;
  }

  function sayName(){
    alert(this.name);
  }
```

#### 原型模式
1.通过hasOwnProperty就知道属性是不是实例的属性,只有属性在实例中，才返回true,否则返回false  `person3.hasOwnProperty("name")`
2.in操作符只要通过对象能够访问到属性就返回true，不论该属性存在于实例中还是原型中 `"name" in person3`
3.hasPrototypeProperty,属性存在原型即为true,实例中一旦重写，则返回false 
```javascript
  function hasPrototypeProperty(object,name) { 
    return !object.hasOwnProperty(name) && (name in object); 
  } 
```
4.更简单的原型
```javascript
  function Person (argument) {
    // body...
  }
  // Person.prototype.name="shunzizhan";
  // Person.prototype.age=24;
  // Person.prototype.job="web前端工程师";
  // Person.prototype.sayName = function(){
  //   alert(this.name);
  // }
  // 简化的原型语法
  Person.prototype = {
    name:"shunzizhan",
    age:24,
    job:"web前端工程师",
    sayName:function(){
      alert(this.name);
    }
  }
```
> 但是在这种情况下hasOwnProperty为false
5.原型的动态性
```javascript
  function Person (argument) {
    // body...
  }
  
  var person1 = new Person();
  Person.prototype.sayName = function(){
    alert("shunzizhan");
  }
  person1.sayName();

   // 注意，如果是重写整个原型对象，调用指针会指向最初的原型对象的_proto_指针
  function Person (argument) {
    // body...
  }
  
  var person1 = new Person();
  Person.prototype = {
    name:"shunzizhan",
    age:24,
    job:"web前端开发",
    sayName:function(){
      alert(this.name);
    }
  }
  person1.sayName();//error
```
6.原生对象的原型 Object /Array/String
```javascript
  String.prototype.startWith=function(text){
    return this.indexOf(text)==0;
  }
  var msg ="hello world";
  alert(msg.startWith('hell'));
```
7.问题：省略构造函数传递参数，所有实例默认情况下取得相同的属性值，最大问题是共享的本质引起
```javascript
  function Person (argument) {
    // body...
  }
  
  
  Person.prototype = {
    name:"shunzizhan",
    age:24,
    job:"web前端开发",
    friends:['a','b'],
    sayName:function(){
      alert(this.name);
    }
  }
  var person1 =new Person();
  var person2 =new Person();
  person2.friends.push('c');
  alert(person1.friends.join("|"));
  alert(person2.friends.join("|"));
```