# ftc-react-comment
it is a component to comment with react-reduct and react

评论返回的是一个json数据，包含

碰到的问题：
输出props都是2遍
```
headers:{ 
"Content-Type": "application/x-www-form-urlencoded",
// 'Accept': 'application/json',
//    　　　'Content-Type': 'application/json',
// 'Access-Control-Allow-Origin':'*',
// 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',后端设置的，前端设置报错
},
```

应该确定哪些页面共享props，当一个页面经常变换时候需要动态更新，当操作其它时候不会改变。
共用一个store，难道要分别写reducer吗，这样才不会影响其它的组件吗？

reducer可以同时触发，比如触发提交评论可以触发再次请求。但是当登录的时候怎么能不影响store

下一步需要实现的是在json中插入数据，并且当回复的时候，考虑怎么一级级显示。相对谁是同级。这是一个难题。


## 碰到的问题
1. UglifyJsPlugin
```
//    new webpack.optimize.UglifyJsPlugin({           //清除打包后文件中的注释,和copyright信息(webpack4.0版本中已经废弃了UglifyJsPlugin)  Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.
//         output: {
//           comments: false,
//         },
//         compress: {
//           warnings: false
//       }
//     }),
```
2. 生命周期
/**
  getDerivedStateFromProps
  render
  componentDidMount
  getDerivedStateFromProps
  getSnapshotBeforeUpdate
 */

 https://segmentfault.com/q/1010000014315535/a-1020000014317700

 添加增删功能

 action负责业务逻辑，reducer只负责更新state