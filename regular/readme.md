#javascript 学习笔记
## 正则表达式
**在线工具**：http://regexper.com

### 什么是正则表达式

- Regular Expression 使用单个字符串来描述、匹配一系列符合`某个句化规则`的字符串
- 简单的说就是按照某种规则去匹配符合条件的字符串

#### 通配符
- `.` 任意字符
- `*` 任意个
- `?` 零个或则一个
- `+` 一次或多次
- `\b` 单词边界
- `[]` 表示或
- `()` 表示分组
- `^` 表示开头
- `$` 表示结尾
- `g` 全文搜索匹配

#### REGEXP

##### 字面量
```
 var str = 'This is a dog He is a boy',
 new_str = str.replace(/\bis\b/g,'IS');
 alert(str+">>>>"+new_str);
```
##### 构造函数
new RegExp(pattern, attributes);
参数 pattern 是一个`字符串`，指定了正则表达式的模式或其他正则表达式。
参数 attributes 是一个可选的字符串，包含属性 "g"、"i" 和 "m"，分别用于指定全局匹配、区分大小写的匹配和多行匹配。ECMAScript 标准化之前，不支持 m 属性。如果 pattern 是正则表达式，而不是字符串，则必须省略该参数。
- g :global 全文搜索，不添加，搜索到第一个匹配停止
- i :ignore case 忽略大小写，默认大小写敏感
- m ：multiple lines多行搜索
```
  var Reg = new RegExp('\\bis\\b','g');
  var str = 'This is a dog He is a boy',
  new_str = str.replace(Reg,'IS');
  alert(str+">>>>"+new_str);
```

#### 元字符
- 原义文本字符 `abc 123`
- 元字符 正则表达式中有特殊含义的非字母字符  `* + ? $ ^ . | \ () {} []`

#### 字符类
用[]构建一个简单的类
类是指符合某些特定性的对象，一个泛指，而不是特指某个字符，表达式[abc]把字符a或b或c归为一类，表达式可以匹配这类的字符
```
'a1b2c3d4'.replace(/[abc]/g,'X')
"X1X2X3d4"
```

#### 字符类取反
使用元字符^创建反向类/负向类
反向类的意思是不属于某类的内容
表达式[^abc]表示不是字符a或b或c的内容
```
'a1b2c3d4'.replace(/[^abc]/g,'X')
"aXbXcXXX"
```

#### 范围类
[a-z] 从a到z的所有小写字母
```
'a1b2c3d4e5'.replace(/[a-z]/g,'Q')
"Q1Q2Q3Q4Q5"
```
[a-zA-Z] 从a到Z的所有大小写字母
```
'a1b2c3d4e5DGDGDGFD'.replace(/[a-z]/g,'Q')
"Q1Q2Q3Q4Q5DGDGDGFD"
```
**注意**如果本身就像匹配`-` [0-9-]
```
'2016-04-09'.replace(/[0-9]/g,'A')
"AAAA-AA-AA"

'2016-04-09'.replace(/[0-9-]/g,'A')
"AAAAAAAAAA"
```

#### 预定义类
. == [^\r\n] 除了回车符和换行符之外的所有字符
\d == [0-9] 数字字符
\D == [^0-9] 非数字字符
\s == [\t\n\x0B\f\r] 空白符
\S == [^\t\n\x0B\f\r] 非空白符
\w == [a-zA-Z_0-9] 单词字符（字母数字下划线）
\W == [^a-zA-Z_0-9] 非单词字符

#### 边界
^ 以XXX开始
$ 以XXX结束
\b 单词边界
\B 非单词边界
```
'@123@456@'.replace(/\@./g,'X')
"X23X56@"
'@123@456@'.replace(/^\@./g,'X')
"X23@456@"

'@123@456@'.replace(/.\@/g,'X')
"@12X45X"
'@123@456@'.replace(/.\@$/g,'X')
"@123@45X"

'This is a dog He is a boy'.replace(/\bis\b/g,'IS');
"This IS a dog He IS a boy"
'This is a dog He is a boy'.replace(/\Bis/g,'IS');
"ThIS is a dog He is a boy"
```

#### 量词
？ 出现零次或者一次（最多出现一次）
+ 出现一次或者多次（至少一次）
* 出现零次或者多次（任意次）
{n} 出现n次
{n,m} 出现n到m次
{n,} 至少出现n次

#### 贪婪模式
```
'12345678'.replace(/\d{3,6}/g,'X')
"X78"
```
#### 非贪婪模式
```
'12345678'.replace(/\d{3,6}?/g,'X')
"XX78"
```

#### 分组
（）可以达到分组的功能
（shunzizhan）{3}
```
'a1b2c3de5'.replace(/([a-z]\d){3}/g,'X')
"Xde5"
```

#### 或
使用|达到或的效果
```
'shunzizhan'.replace(/shun|zizhan/g,'X')
"XX"

'shunzhanshzizhan'.replace(/sh(un|zi)zhan/g,'X')
"XX"
```

#### 反向引用
```
'2016-09-18'.replace(/(\d{4})-(\d{2})-(\d{2})/g,'$2/$3/$1')
"09/18/2016"
```

#### 忽略分组
不希望捕获某些分组，只需要在分组内加上?：
```
/(?:shunzi).(zhan)/g
```

#### 前瞻
正则表达式从文本头部向尾部开始解析，文本尾部方向，称为“前”
前瞻就是在正则表达式匹配到规则的时候，向前检查是否符合断言，后顾/前瞻方向相反
JavaScript不支持后顾
符合和不符合特定断言称为`肯定/正向`匹配和`否定/负向`匹配

正向前瞻 exp(?=assert)
负向前瞻 exp(?!assert)
```
'a2*3'.replace(/\w(?=\d)/g,'X')
"X2*3"

'a2*34v8'.replace(/\w(?=\d)/g,'X')
"X2*X4X8"
'a2*34v8'.replace(/\w(?!\d)/g,'X')
"aX*3XvX"
```

#### 正则表达式的方法
test lastIndex 作怪
```
var reg = /\w/g;
undefined
reg.test('a')
true
reg.test('a')
false
reg.test('a')
true
reg.test('a')
false
```

exec 
使用正则表达式模式对字符串执行搜索，并将更新全局RegExp对象的属性以反映匹配结果
如果没有匹配的文本则返回null,否则返回一个结果数组
- index 声明匹配文本的第一个字符的位置
- input 存放被检索的字符串string


#### 字符串对象方法
##### search
用于检测字符串中指定的子字符串，或检测与正则表达式相匹配的子字符串
方法返回第一个匹配结果index,查找不到返回-1
不执行全局匹配，忽略标志g,并且总是从字符串的开始进行检索
```
'a1b2c3d4'.search(1)
1
'a1b2c3d4'.search('1')
1
'a1b2c3d4'.search(/1/)
1
'a1b2c3d4'.search(/1/g)
1
```

###### match
将检索字符串，以找到一个或者多个与regexp匹配的文本
regexp是否具有标志g对结果影响很大

非全局
没有g，则只能在字符串中执行一次匹配
如果没有找到任何匹配的文本，将返回null
否则他将返回一个数组，其中存放与它找到的匹配有关的信息
返回数组的第一个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本
返回的数组，还包含2个对象属性
 - index 声明匹配文本的起始字符在字符串中的位置
 - input 声明对stringObject的引用


全局
具有g标志，执行全局检索，找到字符串中所有匹配子字符串
如果没有找到任何匹配的文本，将返回null
如果找到了一个或者多个匹配子串，则返回一个数组
数组中存放的是字符串中所有的匹配子串，而且没有index input属性

##### split
```
'a1b2c3d'.split(/\d/)
["a", "b", "c", "d"]
```

##### replace
String.prototype.replace(str,replaceStr)
String.prototype.replace(reg,replaceStr)
String.prototype.replace(reg,function)
**function**4个参数
1.匹配字符串
2.正则表达式分组内容，没有分组则没有该参数
3.匹配项在字符串中的index
4.原字符串
```
'a1b1c1'.replace('1','2')
"a2b1c1"
'a1b1c1'.replace(/1/g,'2')
"a2b2c2"

'a1b2c3d4' => 'a2b3c4d5'

'a1b2c3d4'.replace(/\d/g,function(childstr,index,str){
  return parseInt(childstr)+1;
})

'a1b2c3d4e5'.replace(/(\d)(\w)(\d)/g,function(match,group1,group2,group3,index,origin){
  console.log(match);
  return group1 + group3;
})
VM651:3 1b2
VM651:3 3d4
"a12c34e5"
```