window.Xhrfactory = function() {
  this.init.apply(this, arguments);
};

window.Xhrfactory.prototype = {
  init: function() {
    this.xhr = this.create();
  },
  /**
   * 创建xhr对象
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:43:45+0800
   * @return   {[type]}                 [description]
   */
  create: function() {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXobject) {
      xhr = new ActiveXobject('Msml2.Xmlhttp');
    } else {
      xhr = new ActiveXobject('Microsoft.Xmlhttp');
    }
    return xhr;
  },
  /**
   * 回调函数处理
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:44:02+0800
   * @param    {Function}               callback [description]
   * @return   {[type]}                          [description]
   */
  readystate: function(callback) {
    this.xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        callback(this.responseText);
        console.log(this);
      }
    }
  },
  /**
   * 参数转换
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:45:31+0800
   * @param    {[type]}                 data [请求参数]
   * @return   {[type]}                      [description]
   */
  para: function(data) {
    var datastr = '';
    if (data && Object.prototype.toString.call(data) === "[object object]") {
      for (var i in data) {
        for (var i = 0; i < lenght; i++) {
          datastr += i + '='
          data[i] + '&';
        }
      }
    }
  },
  /**
   * 发送请求
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:46:18+0800
   * @param    {[type]}                 url      [请求地址]
   * @param    {[type]}                 data     [请求参数]
   * @param    {Function}               callback [回调]
   * @return   {[type]}                          [description]
   */
  get: function(url, data, callback) {
    this.readystate(callback);
    var newurl = url;
    var datastr = this.para(data);
    newurl = url + '?' + datastr;
    this.xhr.open('get', newurl, true);
    this.xhr.send(null);
  }
};

// 后台程序的模板变量
var localStorageSign = 'on';
// 版本控制
var resourceVersion = '12312443243203';

// 本地的Sdk主方法
window.mLocalSdk = {
  /**
   * js资源列表
   * @type {Array}
   */
  resourceJavascriptList: [{
    id: '1232131241',
    url: '/dest/js/lib/core.js',
    type: 'javascript'
  }, {
    id: '1232131242',
    url: '/dest/js/lib/log.js',
    type: 'javascript'
  }, {
    id: '1232131243',
    url: '/dest/js/lib/report.js',
    type: 'javascript'
  }],
  /**
   * css资源列表
   * @type {Array}
   */
  resourceCssList: [{
    id: '1232131244',
    url: '/dest/js/lib/core.css',
    type: 'javascript'
  }, {
    id: '1232131245',
    url: '/dest/js/lib/log.css',
    type: 'javascript'
  }, {
    id: '1232131246',
    url: '/dest/js/lib/report.css',
    type: 'javascript'
  }],
  /**
   * 是否需要更新
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:31:58+0800
   * @param    {[type]}                 ) {               return localStorage.getItem('resourceVersion') [description]
   * @return   {[type]}                   [description]
   */
  needUpdate: (function() {
    return localStorage.getItem('resourceVersion') === resourceVersion;
  })(),
  /**
   * 判断是否是IE浏览器
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:32:22+0800
   * @param    {[type]}                 ) {               var v [description]
   * @return   {[type]}                   [description]
   */
  isIE: (function() {
    var v = 3;
    var div = document.createElement('div');
    var all = div.getElementsByTagName('i');
    while (
      div.innerHTML = '<!-- [if gt IE' + (++v) + ']><i></i><![endif] -->', !all[0]) {
      if (v > 11) { return false }
    }
    return v > 3 ? v : false;
  })(),
  /**
   * 检查localStorage的大小 单个不超过9000多个字节 总共不超过5M，因此只对于核心的文件才采取sdk缓存
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:33:44+0800
   * @return   {[type]}                 [description]
   */
  checkHedge: function() {
    var localStorageLength = localStorage.length;
    var localStorageSize = 0;
    for (var i = 0; i < localStorageLength; i++) {
      var key = localStorage.key(i);
      localStorageSize += localStorage.getItem(key).length;
    }
    return localStorageSize;
  },
  /**
   * 保存sdk
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:35:43+0800
   * @return   {[type]}                 [description]
   */
  saveSdk: function() {
    try {
      localStorage.setItem('resourceVersion', resourceVersion);
    } catch (oException) {
      if (oException.name == 'QuotaExceededError') {
        localStorage.clear();
        localStorage.setItem('resourceVersion', resourceVersion);
      }
      alert('QuotaExceededError');
    }

    for (var i = 0; i < this.resourceCssList.length; i++) {
      _self = this;
      (function(i) {
        var cssId = _self.resourceCssList[i]['id'];
        var xhr = new Xhrfactory();
        xhr.get(_self.resourceCssList[i]['url'], null, function(data) {
          try {
            localStorage.setItem(cssId, data);
          } catch (oException) {
            console.log('oException', oException);
            if (oException.name == 'QuotaExceededError') {
              localStorage.clear();
              localStorage.setItem(cssId, data);
            }
          }
        });
      })(i);
      // XXX addhtml 加载到页面
    }

    for (var i = 0; i < this.resourceJavascriptList.length; i++) {
      _self = this;
      (function(i) {
        var scriptId = _self.resourceJavascriptList[i]['id'];
        var xhr = new Xhrfactory();
        xhr.get(_self.resourceJavascriptList[i]['url'], null, function(data) {
          try {
            localStorage.setItem(scriptId, data);
          } catch (oException) {
            console.log('oException', oException);
            if (oException.name == 'QuotaExceededError') {
              localStorage.clear();
              localStorage.setItem(scriptId, data);
            }
          }
        });
      })(i);
      // XXX addhtml 加载到页面
    }
  },
  /**
   * 入口
   * @Author   shunzizhan
   * @Email    shunzizhan@163.com
   * @DateTime 2017-10-11T15:42:40+0800
   * @return   {[type]}                 [description]
   */
  startup: function() {
    // 满足一下条件
    var _self = this;
    if (localStorageSign === 'on' && !this.isIE && window.localStorage) {

      if (this.needUpdate === true) {
        //不需要更新
        return (function() {
          // 将css加载到页面
          for (var i = 0; i < _self.resourceCssList.length; i++) {
            // 获取本地缓存列表 输入到html上
            var cssId = _self.resourceCssList[i]['id'];
            // 把我们的列表中的js文件 渲染到页面

            // 去读取本地文件
            window.mDomUtils.addCssByInline(cssId);
          }
          // 将js加载到页面
          for (var i = 0; i < _self.resourceJavascriptList.length; i++) {
            // 获取本地缓存列表 输入到html上
            var scriptId = _self.resourceJavascriptList[i]['id'];
            // 把我们的列表中的js文件 渲染到页面

            // 去读取本地文件
            window.mDomUtils.addJavascriptByInline(scriptId);
          }
        })();

      } else {
        // 保存我们请求到的js文件
        return (function() {
          _self.saveSdk();
          // 将css加载到页面
          for (var i = 0; i < _self.resourceCssList.length; i++) {
            // 获取本地缓存列表 输入到html上
            var cssId = _self.resourceCssList[i]['id'];
            // 把我们的列表中的js文件 渲染到页面

            // 去读取本地文件
            window.mDomUtils.addCssByInline(cssId);
          }
          // 将js加载到页面
          for (var i = 0; i < _self.resourceJavascriptList.length; i++) {
            // 获取本地缓存列表 输入到html上
            var scriptId = _self.resourceJavascriptList[i]['id'];
            // 把我们的 列表中的js文件 渲染到页面

            // 去读取本地文件
            window.mDomUtils.addJavascriptByInline(scriptId);
          }
        })();

        //***
        // 把从网络获取到的javascript 输入到html上；
        // save localstroage
      }
    } else {

      return function() {
        // alert(2);
        // 将css加载到页面
        for (var i = 0; i < _self.resourceCssList.length; i++) {
          // 获取本地缓存列表 输入到html上
          var cssId = _self.resourceCssList[i]['id'];
          // 把我们的列表中的js文件 渲染到页面

          // 去读取本地文件
          window.mDomUtils.addCssByLink(cssId);
        }
        // 将js加载到页面
        for (var i = 0; i < _self.resourceJavascriptList.length; i++) {
          // 获取本地缓存列表 输入到html上
          var scriptId = _self.resourceJavascriptList[i]['id'];
          // 把我们的列表中的js文件 渲染到页面

          // 读取网络上得到的资源
          window.mDomUtils.addJavascriptByLink(scriptId, resourceJavascriptList[i]['url']);
        }
      }
      //***
      // 把从网络获取到的javascript 输入到html上；
      // 原始方法加载javascriopt
    }

  }
  // 写入本地localstorage


};

window.mDomUtils = {
  // 内联方式添加javascript
  addJavascriptByInline: function(scriptId) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.id = scriptId;
    var heads = document.getElementsByTagName('head');
    if (heads.lenght) {
      heads[0].appendChild(script);
    } else {
      document.documentElement.appendChild(script);
    }
    script.innerHTML = localStorage.getItem(scriptId);
  },


  // 外链方式添加javascript
  addJavascriptByLink: function(scriptId, url) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    script.id = scriptId;
    var heads = document.getElementsByTagName('head');
    if (heads.length) {
      heads[0].appendChild(script);
    } else {
      document.documentElement.appendChild(script);
    }
  },
  // 外链方式添加css
  addCssByLink: function(cssId,url) {
    alert(1)
    var doc = document;
    var link = doc.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    link.id = cssId;
    var heads = doc.getElementsByTagName('head');
    if (heads.length) {
      heads[0].appendChild(link);
    } else {
      doc.documentElement.appendChild(link);
    }
  },
  // 内联方式添加css
  addCssByInline: function(cssId) {
    var doc = document;
    var link = doc.createElement('style');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.id = cssId;
    if (link.stylesheet) {
      // IE支持
      link.stylesheet.cssText = localStorage.getItem(cssId);
    } else {
      // w3c
      var cssText = doc.createTextNode(localStorage.getItem(cssId));
      link.appendChild(cssText);
    }

    var heads = doc.getElementsByTagName('head');
    if (heads.length) {
      heads[0].appendChild(link);
    } else {
      doc.documentElement.appendChild(link);
    }
  }
};