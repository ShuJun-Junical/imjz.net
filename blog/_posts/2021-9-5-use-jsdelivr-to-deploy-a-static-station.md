---
title: 使用 Jsdelivr 部署国内访问速度友好的静态站
date: 2021-08-14
author: 青章浚
location: 衡水
---

*本文迁移自我的博客园*

## 写在前面
### 前言
未备案的域名如果想搭建网站只能选择国外服务器（好像没有任何一家云提供商可以免备案部署国内网站，毕竟不合法）但由于一些众所周知的原因，国内访问国外的服务器会比较慢甚至访问不了，而国内地域的CDN也是对未备案的域名拒之门外的。

**正是[JSDelivr](https://www.jsdelivr.com/)，它是唯一一家：**
 - 完全免费（几乎零成本部署网站）
 - 无需绑定域名（自然就没有了备案的麻烦）
 - 有ICP许可证（这意味着它有国内服务器）

的CDN提供商
### 传统方案
正常部署静态网站，但将其中引用的资源文件放到JSDelivr上，静态托管平台只保留index.html，将其中的引用路径全改为JSDelivr的路径。

**缺点：**
 - 每次更新不仅需要更新静态托管平台的index，还得更新Github上用于JSDelivr的存储库，还要刷新每个文件的缓存
 - 修改网页调试时需要把index.html资源的引用路径改为本地，完事后再改回去，麻烦！
### JSDelivr的局限性
 - 访问html文件并不会返回网页而是返回源代码
 - 单文件不能超过50MB
 - 使用国内服务器，**不能**放违法法律法规的东西
 - 会禁止某些奇怪的扩展名（亲测可用：js、css、各种图片、视频、音频等）
## 0x00准备工作
### 用到的平台
 - [腾讯云函数](https://console.cloud.tencent.com/scf)（或阿里云函数计算）
 - [Github](https://github.com)（或[npm](https://www.npmjs.com/)）
 - [JSDelivr](https://www.jsdelivr.com/)


本文以腾讯云函数、Github为例进行讲解
### 注意事项
 - 腾讯云为国内提供商、JSDelivr有ICP备案和国内服务器，所以**千万不能放违法国家有关法律法规的东西**
 - JSDelivr虽免费，但**不要用于大文件的下载托管和加速**，尽量不要存太大的视频，否则可能会被屏蔽拉黑
 - 本方案的任何一个步骤均是合法合规的，可放心使用
 - index.html建议不要太大，否则加速效果不明显甚至减速
 - 非常适合webpack等前端打包工具编译的index.html很小，大部分网页工作在js里完成的网页
### 大体思路
 - 将静态站点放到Github的公开存储库中，以后更新站点只需更新存储库即可
 - 将域名绑定到腾讯云函数的API网关上，借助腾讯云函数实现跳转访问，具体细节如下：
   - 访问根目录和其他目录啥的：从JSDelivr上获取index.html并返回201状态码和网页（未备案域名选择香港地域，所以首页没有加速效果，建议index.html不要太大）
   - 访问任何静态文件（看路径中是否有点“.”来区分，不是特别好，希望能给我提供一个更完美的方案）：返回301重定向到拼接好的JSDelivr的Url上（实现JSDelivr跳转加速访问）

## 0x01 具体实现

### 云函数代码

[Github Gist - 云函数：通过JSDelivr代理访问静态站](https://gist.github.com/JupiterJun/25b85d357e40b15bbdd9d04dd9d57524)

注意事项：

- 修改第4行baseUrl为自己网站的JSDelivr的根目录
- 需要腾讯云函数，其他云函数提供商移植可适当修改代码
- 需要Axios依赖包（v0.21.1 可用）

index.js

```javascript
const axios = require("axios");

exports.main_handler = async (event, context, callback) => {
  const baseUrl = "https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO_NAME@main/YOUR_DIST_PATH";
  let path = event.path;
  if (path.indexOf('.') != -1) {
    return {
      isBase64Encoded: false,
      statusCode: 301,
      headers: { 'Location': baseUrl + path },
    }
  }
  else {
    try {
      let resopnse = await axios.get(baseUrl + '/index.html');
      return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: resopnse.data
      }
    }
    catch (error) {
      return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: error
      }
    }
  }
}
```

package.json

```json
{
  "name": "static-site-proxy",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "JupiterJun",
  "license": "MIT",
  "dependencies": {
    "axios": "^0.21.1"
  }
}

```

