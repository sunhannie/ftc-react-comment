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