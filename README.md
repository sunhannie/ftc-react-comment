# ftc-react-comment
it is a component to comment with react-reduct and react

评论返回的是一个json数据。

# 数据来源
此登录用户名和账号检测是来自于 跨域实例 创建的serverPost.js，它是一种跨域的实践。

评论数据：来自于本地json文件。


## 碰到的问题：
1. 输出props都是2遍
明白原因了：第一次进入到页面的时候，因为需要去fetch数据，所以会在没数据的情况下有一次渲染，等fetch成功后，会再一次进行渲染。




2. UglifyJsPlugin
```
  new webpack.optimize.UglifyJsPlugin({           //清除打包后文件中的注释,和copyright信息(webpack4.0版本中已经废弃了UglifyJsPlugin)  Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.
      output: {
          comments: false,
      },
      compress: {
          warnings: false
      }
    }),
```
## 生命周期
/**
  getDerivedStateFromProps
  render
  componentDidMount
  getDerivedStateFromProps
  getSnapshotBeforeUpdate
 */

 https://segmentfault.com/q/1010000014315535/a-1020000014317700

测试得到以下结论：

1) 首次渲染: willMount > render > didMount， 
2) props更新时: receiveProps > shouldUpdate > willUpdate > render > didUpdate 
3) state更新时: shouldUpdate > willUpdate > render > didUpdate 
3) 卸载时: willUnmount

假如把CommentList注释了，props不会更新，就不会触发receiveProps。

## 代码备份

```
headers:{ 
"Content-Type": "application/x-www-form-urlencoded",
// 'Accept': 'application/json',
//    　　　'Content-Type': 'application/json',
// 'Access-Control-Allow-Origin':'*',
// 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',后端设置的，前端设置报错
},
```
 export const fetchDataInGet = data => (dispatch, getState)  => {
      dispatch(requestGet(data))  
      return fetch('../../client/data/comment.json')
      .then(response => response.json())
      .then(json =>{console.log(json);} ) 
     return requestComments(dispatch);
 }

 ## 思路
 action负责业务逻辑，reducer只负责更新state

应该确定哪些页面共享props，当一个页面经常变换时候需要动态更新，当操作其它时候不会改变。
共用一个store，难道要分别写reducer吗，这样才不会影响其它的组件吗？

reducer可以同时触发，比如触发提交评论可以触发再次请求。但是当登录的时候怎么能不影响store

下一步需要实现的是在json中插入数据，并且当回复的时候，考虑怎么一级级显示。相对谁是同级。这是一个难题。

redux数据流管理思路，需要确定好几个reducer，每个reducer之间是单独逻辑或者组件所使用的值。

## todo
1. 添加重置密码功能
2. 微信登录功能
3. 导航栏功能
4. 表格接口功能（请求一组数据，显示出来，可以使用闭包等新技术）