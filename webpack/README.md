# webpack学习

## 插件
### 加载 CSS
> npm install --save-dev style-loader css-loader

```javaScript
<!-- webpack.config.js -->
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
<!-- js -->
import Icon from './icon.png';

```

### 加载图片
> npm install --save-dev file-loader

```javaScript
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }

```

### 加载数据
> npm install --save-dev csv-loader xml-loader

```javaScript
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }

```


### 设定 HtmlWebpackPlugin
> npm install --save-dev html-webpack-plugin

```javaScript
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],

```

### 清理 /dist 文件夹
> npm install clean-webpack-plugin --save-dev

```javaScript
const CleanWebpackPlugin = require('clean-webpack-plugin');

 plugins: [
+     new CleanWebpackPlugin(['dist']),

```