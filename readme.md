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