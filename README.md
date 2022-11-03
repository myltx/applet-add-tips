# 微信小程序右上角进入提示弹框 ![](https://img.shields.io/badge/Version-1.0.0-ff974d.svg?style=plastic)

## API
| 参数 | 说明 | 类型 | 默认值 |
| ----------- | ----------- | ----------- |----------- |
| text      | 提示文字   | String | 「添加小程序」访问更便捷!'
| isCache   | 是否需要缓存用户手动关闭时间（用于再次进入是否需要提示）  | Boolean | true
| time   | 缓存时间 (单位天) | Number、String | 7
| delay   | 自动关闭时间 (单位秒)， 如果没有传入 或 为 0 就默认不自动隐藏 | Number、String | 0
| customNav   | 是否是自定义导航栏  | Boolean | false

## 使用
- step1：将此仓库下载/克隆至小程序目录，如 `miniprogram/components/`；

- step2：在需要用到的页面的 `json` 文件中添加如下代码；
 ```javascript
 // xxx.json
 {
  "usingComponents": {
    "mp-html": "/components/mp-html/index",
    "add-tips": "/components/add-tips/index"
  }
 ```

- step3：在需要使用的 `wxml`页面添加如下代码；
```javascript
// xxx.wxml
<add-tips />
```
## 示例项目源码

[demo](https://github.com/mayunlongtx/applet-example)

## 注意事项

- 当使用自定义导航栏是需要将 `<add-tips />`包含在自定义导航 `DOM` 中
